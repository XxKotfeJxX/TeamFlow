import React, { useEffect, useState, useRef } from "react";
import { chatDb, messageDb, type Message } from "../../models/mockDB/chat";
import { Paperclip, Send } from "lucide-react";

interface TeamChatProps {
  teamId: string;
  currentUserId: string;
}

const TeamChat: React.FC<TeamChatProps> = ({ teamId, currentUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 1️⃣ створення або отримання чату для команди
  useEffect(() => {
    const chat = chatDb.createTeam(teamId);
    setChatId(chat.id);
    const list = messageDb.listByChat(chat.id);
    setMessages(list);
  }, [teamId]);

  // 2️⃣ автопрокрутка вниз
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3️⃣ live sync із LocalStorage
  useEffect(() => {
    if (!chatId) return;
    const sync = () => setMessages(messageDb.listByChat(chatId));
    const handler = (e: StorageEvent) => {
      if (e.key === "mock_chat_messages_db_v1") sync();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [chatId]);

  // 4️⃣ надсилання повідомлення
  const sendMessage = () => {
    if (!chatId || !inputValue.trim()) return;
    messageDb.send(chatId, currentUserId, {
      kind: "text",
      text: inputValue.trim(),
    });
    setMessages(messageDb.listByChat(chatId));
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-[500px]">
      {/* Повідомлення */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-16">
            💬 Повідомлень поки немає
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                msg.senderId === currentUserId
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.kind === "text" ? (
                msg.text
              ) : msg.kind === "image" ? (
                <img
                  src={msg.url}
                  alt={msg.alt || "image"}
                  className="rounded-lg max-h-60"
                />
              ) : msg.kind === "audio" ? (
                <audio controls src={msg.url} className="mt-1 w-full" />
              ) : (
                <video
                  controls
                  src={msg.url}
                  className="mt-1 rounded-lg w-full"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Поле вводу */}
      <div className="flex border-t border-gray-200 pt-3">
        <label className="flex items-center cursor-pointer px-3">
          <Paperclip className="text-gray-400 hover:text-gray-600 w-5 h-5" />
          <input
            type="file"
            className="hidden"
            accept="image/*,audio/*,video/*"
            onChange={(e) => {
              if (!chatId || !e.target.files?.[0]) return;
              const file = e.target.files[0];
              const url = URL.createObjectURL(file);
              const kind = file.type.startsWith("image")
                ? "image"
                : file.type.startsWith("audio")
                ? "audio"
                : "video";
              messageDb.send(chatId, currentUserId, {
                kind,
                url,
                mimeType: file.type,
                sizeBytes: file.size,
              });
              setMessages(messageDb.listByChat(chatId));
            }}
          />
        </label>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Напишіть повідомлення..."
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TeamChat;
