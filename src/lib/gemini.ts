/**
 * @file: src/lib/gemini.ts
 * @description: Core AI service layer. Manages the connection to Google Generative AI,
 * handles multimodal (image+text) payloads, and defines the Socratic persona.
 * @dependencies: @google/generative-ai, import.meta.env
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the SDK with the key from your .env
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getGhostInsight = async (
  questionText: string,
  imageBase64: string,
  solutionLogic: string,
) => {
  // 2. Use the Flash model for speed and visual reasoning
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    // This is the "Ghost's Soul" - The System Instruction
    systemInstruction: `You are the "Socratic Ghost," an elite CAT Quant tutor specializing in Time, Speed, and Distance (TSD).
    
    CORE PEDAGOGY:
    - Never give the final answer.
    - If the student is correct, challenge them: "Excellent. How would the time change if the speed was doubled?"
    - If the student is wrong, find the specific "TSD Trap" they fell into (e.g., forgetting to convert km/hr to m/s, or using the wrong relative speed).
    
    TSD SPECIFIC LOGIC:
    - Encourage the use of ratios: $S_1:S_2 = T_2:T_1$ when Distance is constant.
    - Look for "Relative Speed" errors in meeting/overtaking problems.
    
    FORMATTING:
    - Always use LaTeX for math: $d = s \times t$.
    - Use "Ghostly" but professional tone (e.g., "The path is clear, but your pace is off...").
    - Keep responses to 2-3 concise sentences.`,
  });

  // 3. Prepare the multimodal payload (Text + Image)
  const prompt = `
    The student is solving this question: "${questionText}"
    Official logic for reference: "${solutionLogic}"
    
    Based on their drawing, give them a Socratic hint.
  `;

  const imagePart = {
    inlineData: {
      data: imageBase64.split(",")[1], // Extract the raw base64 data
      mimeType: "image/png",
    },
  };

  try {
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Ghost is having trouble seeing the canvas. Check your connection.";
  }
};
