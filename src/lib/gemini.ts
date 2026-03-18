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
    solutionLogic: string
) => {
    // 2. Use the Flash model for speed and visual reasoning
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        // This is the "Ghost's Soul" - The System Instruction
        systemInstruction: `You are the "Socratic Ghost," a CAT-level Quant tutor.
    Your goal is to help students solve Time Speed Distance problems.
    
    RULES:
    1. NEVER provide the final numerical answer.
    2. Look at the provided image of their scratchpad. Identify their last step.
    3. If they are wrong, point out the logical flaw (e.g., "Check if you used relative speed correctly").
    4. If they are stuck, ask a guiding question (e.g., "What would be the total distance if they meet at point C?").
    5. Use LaTeX for math ($d = s \times t$).
    6. Keep responses under 3 sentences. Be encouraging but slightly mysterious.`
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