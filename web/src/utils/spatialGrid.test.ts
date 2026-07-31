import { createSpatialGrid } from './spatialGrid';

describe('createSpatialGrid', () => {
  it('inserts and queries items within radius', () => {
    const grid = createSpatialGrid<string>(100);
    grid.insert('a', 50, 50);
    grid.insert('b', 80, 80);
    grid.insert('c', 500, 500);

    const results = grid.query(50, 50, 100);
    expect(results).toContain('a');
    expect(results).toContain('b');
    expect(results).not.toContain('c');
  });

  it('returns empty array when no items in radius', () => {
    const grid = createSpatialGrid<string>(100);
    grid.insert('a', 50, 50);

    const results = grid.query(500, 500, 50);
    expect(results).toEqual([]);
  });

  it('handles items at cell boundaries', () => {
    const grid = createSpatialGrid<string>(100);
    grid.insert('a', 99, 99);
    grid.insert('b', 101, 101);

    const results = grid.query(100, 100, 50);
    expect(results).toContain('a');
    expect(results).toContain('b');
  });

  it('clear removes all items', () => {
    const grid = createSpatialGrid<string>(100);
    grid.insert('a', 50, 50);
    grid.clear();

    const results = grid.query(50, 50, 100);
    expect(results).toEqual([]);
  });

  it('handles multiple items in same cell', () => {
    const grid = createSpatialGrid<number>(100);
    grid.insert(1, 10, 10);
    grid.insert(2, 20, 20);
    grid.insert(3, 30, 30);

    const results = grid.query(20, 20, 50);
    expect(results).toHaveLength(3);
  });

  it('does not return items outside radius in neighboring cells', () => {
    const grid = createSpatialGrid<string>(50);
    grid.insert('near', 25, 25);
    grid.insert('far', 200, 200);

    const results = grid.query(25, 25, 30);
    expect(results).toContain('near');
    expect(results).not.toContain('far');
  });

  it('handles zero-distance query (exact position)', () => {
    const grid = createSpatialGrid<string>(100);
    grid.insert('exact', 50, 50);
    grid.insert('offset', 51, 51);

    const results = grid.query(50, 50, 0);
    expect(results).toContain('exact');
    expect(results).not.toContain('offset');
  });

  it('handles large radius spanning multiple cells', () => {
    const grid = createSpatialGrid<string>(50);
    grid.insert('a', 10, 10);
    grid.insert('b', 60, 60);
    grid.insert('c', 110, 110);
    grid.insert('d', 500, 500);

    const results = grid.query(60, 60, 150);
    expect(results).toContain('a');
    expect(results).toContain('b');
    expect(results).toContain('c');
    expect(results).not.toContain('d');
  });
});
