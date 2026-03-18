import React from "react";

const QuestionPanel: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold mb-4 uppercase tracking-wider">
          Quantitative Analysis
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
          The Convergence Challenge
        </h1>
        <div className="prose prose-slate prose-lg">
          <p className="text-slate-700 leading-relaxed mb-6">
            A sequence $a_n$ is defined by $a_1 = 2$ and $a_{n + 1} = \frac{1}
            {2}(a_n + \frac{3}
            {a_n})$ for $n \ge 1$.
          </p>
          <p className="text-slate-800 font-medium mb-4">
            Which of the following statements is true about the sequence?
          </p>
          <ul className="space-y-4 list-none p-0">
            {[
              "The sequence diverges.",
              "The sequence converges to √3.",
              "The sequence converges to 3.",
              "The sequence oscillates between 1 and 2.",
            ].map((opt, i) => (
              <li
                key={i}
                className="flex items-center p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-primary hover:shadow-sm transition-all cursor-pointer"
              >
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold mr-4 text-slate-500">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-slate-700">{opt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;
