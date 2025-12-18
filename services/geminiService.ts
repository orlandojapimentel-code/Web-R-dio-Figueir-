
import { GoogleGenAI } from "@google/genai";

export const getGeminiNews = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    if (!process.env.API_KEY) return null;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gere 3 notícias curtas e criativas para o site de uma Web Rádio chamada 'Web Rádio Figueiró'. Foca em música, cultura local e entretenimento. Retorne apenas JSON com array de objetos: title, content, date.",
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
