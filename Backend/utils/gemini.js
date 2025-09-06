import { GoogleGenAI } from "@google/genai";

export const getResponse = async (prompt, history = []) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let content = history.flatMap((chat) => [
    { role: "user", parts: [{ type: "text", text: chat.prompt }] },
    { role: "model", parts: [{ type: "text", text: chat.content }] }
  ]);

  content.push({ role: "user", parts: [{ type: "text", text: prompt }] });
  

  try {
    const response1 = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: content,
    });

    return response1.text;
  } catch (err) {
    console.error(err);
    throw new Error("Gemini API Error");
  }
};
