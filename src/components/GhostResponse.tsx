/**
 * @file: src/components/GhostResponse.tsx
 * @description: Displays the AI's Socratic hints with full LaTeX math support.
 * @dependencies: react-markdown, remark-math, rehype-katex, katex/dist/katex.min.css
 */

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // The CSS that makes the math look pretty

interface GhostResponseProps {
  message: string;
  isThinking: boolean;
}

export const GhostResponse = ({ message, isThinking }: GhostResponseProps) => {
  if (!message && !isThinking) return null;

  return (
    <div
      className={`p-6 rounded-2xl mb-6 border transition-all duration-500 ${
        isThinking
          ? "bg-slate-50 border-slate-200 animate-pulse"
          : "bg-indigo-50 border-indigo-100 shadow-sm"
      }`}
    >
      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
        The Ghost's Whisper
      </h3>
      <div className="prose prose-indigo text-slate-700 italic">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
};
