import { Content as ChatMessage } from "firebase/vertexai-preview";
import { geminiFlash } from "libs/gemini";

export async function createChat(
  chatHistory: ChatMessage[],
  onResponseText: (text: string) => void,
  systemPrompt?: string
) {
  const chat = geminiFlash({ additionalSystemPrompt: systemPrompt }).startChat({
    history: chatHistory,
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  return {
    sendMessage: async (message: string) => {
      const result = await chat.sendMessageStream(message);
      let text = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        onResponseText(text);
      }
      return text;
    },
  };
}
