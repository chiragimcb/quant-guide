import { useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { TSD_QUESTIONS } from "./questions"; // Import our bank
import "@excalidraw/excalidraw/index.css";
import "./index.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = TSD_QUESTIONS[currentIndex];

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
          <h1 className="text-2xl font-semibold text-slate-800 leading-snug">
            {currentQuestion.text}
          </h1>

          <button className="mt-8 w-fit px-8 py-3 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-all font-medium flex items-center gap-2 border border-indigo-100">
            Consult the Ghost 👻
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-auto pt-8 border-t border-slate-100">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 disabled:opacity-30"
          >
            Previous
          </button>
          <button
            disabled={currentIndex === TSD_QUESTIONS.length - 1}
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>

      {/* Right: The Scratchpad */}
      <div className="w-[60%] h-full relative">
        <Excalidraw zenModeEnabled={true} />
      </div>
    </div>
  );
}

export default App;