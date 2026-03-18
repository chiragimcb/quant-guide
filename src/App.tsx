/**
 * @file: App.tsx
 * @description: Main application entry point. Manages state for the CAT question bank,
 * integrates the Excalidraw canvas, and orchestrates the Ghost AI consultation flow.
 * @dependencies: @excalidraw/excalidraw, Gemini Service, TSD_QUESTIONS
 */

import { useState } from "react";
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import { TSD_QUESTIONS } from "./questions";
import { getGhostInsight } from "./lib/gemini";
import { blobToBase64 } from "./utils/imageHelpers";
import "@excalidraw/excalidraw/index.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null); // CRITICAL: Added API ref
  const [ghostMessage, setGhostMessage] = useState<string>("");
  const [isThinking, setIsThinking] = useState(false);

  const currentQuestion = TSD_QUESTIONS[currentIndex];

  const handleConsultGhost = async () => {
    if (!excalidrawAPI) {
      console.error("Excalidraw API not ready");
      return;
    }

    setIsThinking(true);
    setGhostMessage("The Ghost is studying your work...");

    try {
      const elements = excalidrawAPI.getSceneElements();
      if (elements.length === 0) {
        setGhostMessage("The canvas is empty! Draw your thoughts first.");
        setIsThinking(false);
        return;
      }

      const blob = await exportToBlob({
        elements,
        mimeType: "image/png",
        appState: { ...excalidrawAPI.getAppState(), exportWithBlur: false },
      });

      const base64 = await blobToBase64(blob);
      const insight = await getGhostInsight(
        currentQuestion.text,
        base64,
        currentQuestion.solutionLogic
      );

      setGhostMessage(insight);
    } catch (err) {
      setGhostMessage("The Ghost vanished unexpectedly. Try again.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      {/* Left: Structured Test Pane */}
      <div className="w-[40%] border-r border-slate-200 p-12 flex flex-col bg-white shadow-sm z-10">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
            CAT Quant: {currentQuestion.topic}
          </span>
          <span className="text-xs font-mono text-slate-400">
            Q {currentIndex + 1} of {TSD_QUESTIONS.length}
          </span>
        </div>

        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-slate-800 leading-snug mb-6">
            {currentQuestion.text}
          </h1>

          {/* DISPLAY GHOST MESSAGE HERE */}
          {ghostMessage && (
            <div className={`p-4 rounded-xl mb-6 text-sm border ${isThinking ? 'bg-slate-50 text-slate-400' : 'bg-indigo-50 text-indigo-900 border-indigo-100 italic'}`}>
              <strong>The Ghost says:</strong> {ghostMessage}
            </div>
          )}

          <button
            onClick={handleConsultGhost} // LINKED FUNCTION
            disabled={isThinking}
            className="w-fit px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium flex items-center gap-2 shadow-lg shadow-indigo-200 disabled:opacity-50"
          >
            {isThinking ? "Ghost is thinking..." : "Consult the Ghost 👻"}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-auto pt-8 border-t border-slate-100">
          <button
            disabled={currentIndex === 0}
            onClick={() => {
              setCurrentIndex(prev => prev - 1);
              setGhostMessage(""); // Clear ghost when changing questions
            }}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 disabled:opacity-30"
          >
            Previous
          </button>
          <button
            disabled={currentIndex === TSD_QUESTIONS.length - 1}
            onClick={() => {
              setCurrentIndex(prev => prev + 1);
              setGhostMessage(""); // Clear ghost when changing questions
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>

      {/* Right: The Scratchpad */}
      <div className="w-[60%] h-full relative">
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)} // CAPTURE THE API
          zenModeEnabled={true}
        />
      </div>
    </div>
  );
}

export default App;