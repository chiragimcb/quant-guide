# Daily Pulse: [March 17, 2026]

## Current Sprint
Phase 1: Getting the "iPad Scratchpad" live and responsive.

## Today's Objective
- Set up a new project in `quant-guide`.
- Ensure the `Excalidraw` canvas works flawlessly with Apple Pencil on iPad Safari.
- Verify that we can "Capture" the canvas as an image for future AI analysis.

## Blockers
- None. (Transitioning from ideation to code).


## EXECUTION LOGS:

# 👻 Quant-Guide: Socratic iPad Tutor
**Project Start Date:** March 17, 2026
**Tech Stack:** React 19, Vite 6, Tailwind CSS v4, Excalidraw

---

## 🚩 Milestone 1: The Infrastructure (Day 1)
**Goal:** Establish a stable, full-screen iPad environment with low-latency drawing capabilities.

### 🛠️ Architecture Decisions
1. **Library Pivot:** Swapped `tldraw` for `Excalidraw`. 
   - *Reasoning:* Tldraw (v4.4) had nested dependency conflicts with Vite 6's import analysis for `@tiptap/core`. Excalidraw provided a zero-dependency "island" architecture that worked immediately.
2. **Tailwind v4 Integration:** Moved to a "CSS-first" setup using `@tailwindcss/vite`.
   - *Reasoning:* Eliminated `postcss.config.js` and `tailwind.config.js` to reduce "config drift" and leverage the new Rust-based engine.
3. **iPad Optimization:** Implemented `100dvh` and `touch-action: none` via Tailwind utility classes to prevent Safari "bounce" and accidental scrolling.

### 🚧 Hurdles & Bug Fixes
- **Error:** `Internal server error: Failed to resolve entry for package "@tiptap/core"`.
  - *Fix:* Abandoned manual aliasing; pivoted to a simpler library.
- **Error:** Canvas rendered as raw HTML text/radio buttons.
  - *Fix:* Discovered that `@excalidraw/excalidraw/index.css` must be explicitly imported in `App.tsx` to mount the UI components.
- **Error:** Apple Pencil not registering strokes.
  - *Fix:* Wrapped the component in an `absolute inset-0` container to ensure the coordinate system aligned with the viewport.

### 📍 Current Project State
- [x] Dual-pane 40/60 Layout.
- [x] Apple Pencil compatible canvas.
- [x] Minimalist "Zen Mode" UI.
- [x] Network bridge for iPad testing (`--host`).

---

## 🧪 Future Milestones
- [ ] **Phase 2:** Gemini 3 Flash API Integration (The Ghost's Vision).
- [ ] **Phase 3:** Canvas-to-Base64 Image Pipeline.
- [ ] **Phase 4:** Socratic Prompt Engineering (System Instructions).