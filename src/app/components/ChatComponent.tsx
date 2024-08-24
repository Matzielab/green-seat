import { createChat } from "app/actions/createChat";
import { useState } from "react";
import { Button } from "./Button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "app/styles/MarkdownStyles.module.css";
import { Content as ChatMessage } from "firebase/vertexai-preview";

type Props = {
  systemPrompt?: string;
};

export const ChatComponent = ({ systemPrompt }: Props) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setIsLoading(true);
    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: inputMessage }],
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      const chat = await createChat(
        chatHistory,
        (text) => {
          setChatHistory((prev) => {
            const newHistory = [...prev];
            const lastMessage = newHistory[newHistory.length - 1];
            if (lastMessage.role === "model") {
              lastMessage.parts[0].text = text;
            } else {
              newHistory.push({
                role: "model",
                parts: [{ text }],
              });
            }
            return newHistory;
          });
        },
        systemPrompt
      );

      await chat.sendMessage(inputMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-800"
              } ${styles.chatMarkdownWrapper}`}
            >
              <Markdown remarkPlugins={[remarkGfm]}>
                {message.parts[0].text}
              </Markdown>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="bg-gray-700 block w-full rounded-md border-gray-500 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm text-white"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <Button
            onClick={handleSendMessage}
            isLoading={isLoading}
            text={"Send"}
          />
        </div>
      </div>
    </div>
  );
};
