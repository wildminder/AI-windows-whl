# Windows AI Wheels

A web application for browsing and installing pre-compiled Python wheel packages for AI/ML libraries on Windows.

## Overview

This application provides a searchable interface for finding and installing Python wheels compiled for Windows with CUDA support. It helps developers quickly locate compatible packages for their specific environment configurations.

**Live Site**: [https://wildminder.github.io/AI-windows-whl/](https://wildminder.github.io/AI-windows-whl/)

## Features

- **Package Search**: Search packages by name, description, or version
- **Environment Filtering**: Filter by Python, PyTorch, and CUDA versions
- **ABI3 Compatibility**: Handles ABI3 wheels (compatible across Python versions)
- **One-Click Install**: Copy pip install commands or direct wheel URLs
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Performance Mode**: Toggle animations for low-end devices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Testing**: Vitest + Testing Library

## Project Structure

```
gh-pages/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions deployment
├── docs/                    # Built application (GitHub Pages serves this)
├── web/                     # Source code
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript definitions
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   ├── index.html           # Entry HTML
│   └── package.json
└── README.md
```

## Development

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
cd web
npm install
```

### Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run typecheck    # TypeScript validation
npm run lint         # ESLint check
npm test             # Run tests
```

## Deployment

The application is automatically deployed via GitHub Actions when changes are pushed to the `gh-pages` branch.

### Workflow

1. Push changes to `gh-pages` branch
2. GitHub Actions runs:
   - Lint check
   - TypeScript check
   - Production build to `docs/`
3. Built files are committed back to the branch
4. GitHub Pages serves from `docs/`

### Manual Deployment

```bash
cd web
npm run build
# docs/ folder is updated with built files
```

## Data Source

Wheel data is fetched from:
- Primary: Local `wheels.json` (if available)
- Fallback: [GitHub raw URL](https://raw.githubusercontent.com/wildminder/AI-windows-whl/main/wheels.json)

### JSON Schema

```json
{
  "last_updated_utc": "2026-01-23T16:35:22Z",
  "packages": [
    {
      "id": "flashattention",
      "name": "Flash Attention",
      "description": "High-performance attention implementation.",
      "official_repo": "https://github.com/Dao-AILab/flash-attention",
      "wheels": [
        {
          "package_version": "2.7.4",
          "python_version": "3.10",
          "torch_version": "2.6.0",
          "cuda_version": "12.4",
          "cxx11_abi": false,
          "url": "https://..."
        }
      ]
    }
  ]
}
```

### Version Format

Versions support both exact values and ranges:

| Format | Display | Meaning |
|--------|---------|---------|
| `"3.10"` | `3.10` | Exact version |
| `["3.9", null]` | `3.9+` | Minimum version (ABI3) |
| `["3.9", "3.12"]` | `3.9 - 3.12` | Version range |
| `[null, null]` | `any` | Any version |

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

Requires ES2020 support.


## Related Repository

- **Wheel Data**: [wildminder/AI-windows-whl](https://github.com/wildminder/AI-windows-whl) - Contains the `wheels.json` data file and wheel hosting

## License

This project is provided under the Apache License 2.0.

## Author

**wildminder** - [GitHub](https://github.com/wildminder) | [HuggingFace](https://huggingface.co/Wildminder)
