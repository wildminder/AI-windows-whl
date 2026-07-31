export interface SpatialGrid<T> {
  insert(item: T, x: number, y: number): void;
  query(x: number, y: number, radius: number): T[];
  clear(): void;
}

/**
 * Grid-based spatial hash for efficient neighbor queries.
 * Divides space into cells of `cellSize` and only checks neighboring cells.
 * Reduces O(n²) pair checks to O(n·k) where k is average neighbors per cell.
 */
export function createSpatialGrid<T>(cellSize: number): SpatialGrid<T> {
  const grid = new Map<string, { item: T; x: number; y: number }[]>();

  function key(cx: number, cy: number): string {
    return `${cx},${cy}`;
  }

  return {
    insert(item: T, x: number, y: number): void {
      const cx = Math.floor(x / cellSize);
      const cy = Math.floor(y / cellSize);
      const k = key(cx, cy);
      const cell = grid.get(k);
      if (cell) {
        cell.push({ item, x, y });
      } else {
        grid.set(k, [{ item, x, y }]);
      }
    },

    query(x: number, y: number, radius: number): T[] {
      const results: T[] = [];
      const cx = Math.floor(x / cellSize);
      const cy = Math.floor(y / cellSize);
      const cellRadius = Math.ceil(radius / cellSize);

      for (let dx = -cellRadius; dx <= cellRadius; dx++) {
        for (let dy = -cellRadius; dy <= cellRadius; dy++) {
          const cell = grid.get(key(cx + dx, cy + dy));
          if (cell) {
            for (const entry of cell) {
              const distX = entry.x - x;
              const distY = entry.y - y;
              if (distX * distX + distY * distY <= radius * radius) {
                results.push(entry.item);
              }
            }
          }
        }
      }
      return results;
    },

    clear(): void {
      grid.clear();
    },
  };
}
