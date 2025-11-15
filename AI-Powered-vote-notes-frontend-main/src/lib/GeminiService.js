// src/lib/GeminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Convert our chat format to Gemini format
function formatMessages(messages) {
  return messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

export async function callGemini(messages, userPrompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    });

    const result = await model.generateContent({
      contents: [
        ...formatMessages(messages),
        { role: "user", parts: [{ text: userPrompt }] }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    console.log("result->", result.response.text() )

    return result.response.text(); // return plain text
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "⚠️ AI Error: Unable to process your message.";
  }
}
