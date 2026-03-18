# Project Standards & Contribution Guidelines

This repository follows "High-Agency" engineering standards. Whether you are an AI or a Human, follow these rules.

## 🚀 Development Workflow
1. **Branching:** Never work on `main`. Create a `feature/` branch for all logic and a `docs/` branch for documentation.

2. **Commit Style:** Use Atomic Commits.
   - `Feat:` New features.
   - `Fix:` Bug fixes.
   - `Docs:` Documentation updates.
   - `Refactor:` Code cleanup without feature changes.

   - `Example commit:`  git commit -m "Fix: Add API ref to capture Excalidraw canvas"

3. **Branching Strategy:** 
- `main`: The production-ready stable core.
- `feature/`: All new development (e.g., feature/ghost-vision).
- `docs/`: Specific documentation overhauls.

## 📝 Documentation Standard
Every new file MUST include the **Architectural Header**:
```typescript
/**
 * @file: [Path/To/File]
 * @description: [Short summary of responsibility]
 * @dependencies: [List of external libraries]
 */