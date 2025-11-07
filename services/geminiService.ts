
import { GoogleGenAI, GenerateContentResponse, GroundingChunk } from "@google/genai";
import { GEMINI_FLASH, GEMINI_PRO } from '../constants';
import { ChatMessage, ChatMode } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

// FIX: Initialize GoogleGenAI according to new guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// REMOVED: Deprecated getGenerativeModel calls which are against best practices.
// API calls will now be made directly using ai.models.generateContent.

const processApiResponse = (response: GenerateContentResponse): ChatMessage => {
  const modelResponse: ChatMessage = {
    role: 'model',
    text: response.text.trim(),
  };

  const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
  if (groundingMetadata?.groundingChunks) {
    const sources = (groundingMetadata.groundingChunks as GroundingChunk[])
      .filter(chunk => chunk.web?.uri)
      .map(chunk => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri,
      }));
    if (sources.length > 0) {
      modelResponse.sources = sources;
    }
  }
  return modelResponse;
};


export const runChat = async (history: ChatMessage[], message: string, mode: ChatMode, context: string = ''): Promise<ChatMessage> => {
  try {
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    let systemInstruction = "You are an AI Tutor specializing in Polish history. Be concise, helpful, and accurate.";
    if (context) {
      systemInstruction += `\n\nUse the following context to answer the user's question:\nCONTEXT:\n${context}`;
    }

    const contents = [...chatHistory, { role: 'user', parts: [{ text: message }] }];

    // FIX: Refactored to use the modern, stateless ai.models.generateContent API for all chat modes,
    // which aligns with the application's state management and new SDK guidelines.
    switch (mode) {
      case ChatMode.Grounded:
        const groundedResult = await ai.models.generateContent({
          model: GEMINI_FLASH,
          contents: contents,
          config: {
            systemInstruction,
            tools: [{googleSearch: {}}],
          }
        });
        return processApiResponse(groundedResult);

      case ChatMode.Thinking:
        const proResult = await ai.models.generateContent({
          model: GEMINI_PRO,
          contents: contents,
          config: {
            systemInstruction,
            thinkingConfig: { thinkingBudget: 32768 }
          },
        });
        return processApiResponse(proResult);
      
      case ChatMode.Chat:
      default:
        const chatResult = await ai.models.generateContent({
            model: GEMINI_FLASH,
            contents: contents,
            config: {
                systemInstruction,
            },
        });
        return processApiResponse(chatResult);
    }
  } catch (error) {
    console.error("Error running chat with Gemini:", error);
    return {
      role: 'model',
      text: "Sorry, I encountered an error. Please check the console for details or try again.",
    };
  }
};
