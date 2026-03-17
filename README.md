# 👻 Quant-Guide: Socratic iPad Tutor
**Project Status:** Milestone 1 Verified ✅ | Phase 2 In Progress 🚧
**Primary User:** iPad Pro + Apple Pencil

---

## 🏛️ System Architecture
- **Framework:** React 19 + Vite 6 (SPA)
- **Styling:** Tailwind CSS v4
- **Canvas engine:** Excalidraw (Pivoted for Vite 6 compatibility)
- **AI Brain:** Gemini 1.5 Flash (Multimodal)
- **Data Source:** 2IIM CAT Question Bank (Arithmetic/TSD)

## 🚩 Milestone 1: The Stable Infrastructure
- [x] Established Vite 6 + React 19 boilerplate.
- [x] Integrated Excalidraw with fixed iPad scrolling/interactivity.
- [x] Implemented SSH-based Git workflow with branch protection.
- [x] Structured `src/questions.ts` with 2IIM Time-Speed-Distance content.

## 🚧 Current Phase: The Ghost Vision (Phase 2)
**Goal:** Enable the AI to "see" and "critique" Apple Pencil sketches.
- [ ] Secure API key management via `.env`.
- [ ] Base64 Image Processing pipeline.
- [ ] Socratic Prompt Engineering.

---

## 📝 Developer Notes
- **Git Protocol:** Always use SSH (`git@github.com:chiragimcb/quant-guide.git`) to avoid account credential clashes on this machine.
- **iPad Testing:** Use `npm run dev -- --host` and access via local IP on Safari.