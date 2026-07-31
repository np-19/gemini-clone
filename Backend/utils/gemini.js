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
      model: "gemini-2.5-flash",
      contents: content,
    });
    return { text: response1.text , response1};
  } catch (err) {
    console.error(err);
    throw new Error("Gemini API Error");
  }
};

export const enhancePrompt = async (prompt) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const wordCount = prompt.trim().split(/\s+/).length;
  const isLongPrompt = wordCount > 30;
  
  const systemPrompt = isLongPrompt 
    ? `Refine this prompt using better words and clearer structure to get the most optimal AI response.

CRITICAL RULES:
- Maximum length: 1.5x the original word count
- Remove redundancy and unnecessary words
- Use precise, impactful language
- Improve clarity and specificity
- Keep core intent intact
- Output ONLY the refined prompt, no explanations

Original: ${prompt}

Refined:`
    : `Enhance this prompt to get the most optimal AI response. Add crucial context, specificity, and clarity.

CRITICAL RULES:
- Maximum length: 2-3x the original word count
- Add only high-value details that improve response quality
- Include specific requirements, format preferences, or constraints if helpful
- Use precise, actionable language
- Keep the core intent intact
- Output ONLY the enhanced prompt, no explanations

Original: ${prompt}

Enhanced:`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [{ role: "user", parts: [{ type: "text", text: systemPrompt }] }],
    });
    return { text: response.text.trim() };
  } catch (err) {
    console.error(err);
    throw new Error("Prompt Enhancement Error");
  }
};
