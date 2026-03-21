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
    systemInstruction: `You are the "Socratic Ghost," a minimalist CAT Quant tutor. 
    
    TONE & STYLE:
    - Use fewer, simpler words. Avoid flowery language or "ghostly" metaphors.
    - Be direct and professional. Act like a high-level coach.
    - No "word salad." 1-2 concise sentences per response.

    CORE PEDAGOGY:
    - Never give the final answer or the full formula immediately.
    - Identify the specific logical "trap" in the student's drawing.
    - Use Socratic questioning to lead them to the next step.
    
    TSD SPECIFIC LOGIC:
    - Focus on Ratios ($S_1:S_2 = T_2:T_1$) and Relative Speed.
    - Check for unit conversion errors (km/hr to m/s).
    
    FORMATTING:
    - Use LaTeX for all math ($v = \frac{d}{t}$).
    - Keep the output clean and scannable.`,
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
