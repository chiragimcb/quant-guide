# ADR 001: Selection of Core Tech Stack

- **Status:** Decided
- **Date:** 2024-05-22
- **Owner:** @chiragimcb (Architect)
- **Deciders:** @chiragimcb, Gemini (AI Collaborator)

## Context
The "Quant-Guide" project requires a low-latency, high-performance environment for iPad-based ink-to-AI processing. The primary user interface is a canvas that must handle Apple Pencil input without lag, while simultaneously communicating with a Multimodal LLM (Gemini 1.5 Flash).

## Decision
We have selected the following stack:
1. **React 19:** For future-proof concurrent rendering and modern hook patterns.
2. **Vite 6:** For nearly instantaneous HMR (Hot Module Replacement) during "Vibe Coding" sessions.
3. **TypeScript:** To enforce data integrity between the canvas (Excalidraw) and the AI service layer.
4. **Excalidraw:** Chosen over the native Canvas API for its robust "out-of-the-box" support for Apple Pencil pressure and iPad touch gestures.
5. **Gemini 1.5 Flash:** Selected over "Pro" for its superior speed-to-intelligence ratio in multimodal (vision) tasks.

## Consequences
- **Positive:** Rapid development cycle; high-quality handwriting recognition via Flash.
- **Negative:** We must manage the `.env` carefully and ensure the Base64 image pipeline is optimized to avoid memory bloat on mobile Safari.
- **Risks:** Client-side API keys are exposed in the network tab; a backend proxy (Vercel/Node) will be required before public release.