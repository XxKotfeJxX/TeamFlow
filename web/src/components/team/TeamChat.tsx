import React, { useEffect, useState, useRef } from "react";
import { chatDb, messageDb, type Message } from "../../models/mockDB/chat";
import { Paperclip, Send } from "lucide-react";
import { Input } from "../ui/Input";

interface TeamChatProps {
  teamId: string;
  currentUserId: string;
}

const formatDateLabel = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const d = date.toDateString();
  if (d === today.toDateString()) return "Сьогодні";
  if (d === yesterday.toDateString()) return "Вчора";
  return date.toLocaleDateString("uk-UA");
};

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

  // 2️⃣ автопрокрутка вниз лише для чату
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

  // 🔹 групування повідомлень за датою
  const grouped = messages.reduce<Record<string, Message[]>>((acc, msg) => {
    const key = msg.createdAt.toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(msg);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-[500px] overflow-hidden">
      {/* Повідомлення */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-1">
        {Object.entries(grouped).length === 0 && (
          <p className="text-gray-400 text-center mt-16">
            💬 Повідомлень поки немає
          </p>
        )}

        {Object.entries(grouped).map(([dateKey, msgs]) => (
          <div key={dateKey} className="space-y-3 mr-8">
            <div className="text-center text-xs text-gray-400 my-2">
              {formatDateLabel(new Date(dateKey))}
            </div>

            {msgs.map((msg) => {
              const isMine = msg.senderId === currentUserId;

              const renderMessageContent = (message: Message) => {
                switch (message.kind) {
                  case "text": {
                    return <span>{message.text}</span>;
                  }

                  case "image": {
                    return (
                      <img
                        src={message.url}
                        alt={message.alt || "image"}
                        className="rounded-lg max-h-60"
                      />
                    );
                  }

                  case "audio": {
                    return (
                      <audio
                        controls
                        src={message.url}
                        className="mt-1 w-full"
                      />
                    );
                  }

                  case "video": {
                    return (
                      <video
                        controls
                        src={message.url}
                        className="mt-1 rounded-lg w-full"
                      />
                    );
                  }

                  // 🔹 fallback для майбутніх або невідомих типів
                  default: {
                    const m = message as Partial<{ url: string }>;
                    return m.url ? (
                      <a
                        href={m.url}
                        download
                        className="text-blue-200 underline break-all"
                      >
                        📎 Завантажити файл
                      </a>
                    ) : (
                      <span className="italic text-gray-400">
                        Непідтримуване повідомлення
                      </span>
                    );
                  }
                }
              };

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                      isMine
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {renderMessageContent(msg)}

                    <div className="text-[10px] mt-1 text-gray-400 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString("uk-UA", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Поле вводу */}
      <div className="flex border-t border-gray-200 pt-3">
        <label className="flex items-center cursor-pointer px-3">
          <Paperclip className="text-gray-400 hover:text-gray-600 w-5 h-5" />
          <Input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (!chatId || !e.target.files?.[0]) return;

              const file = e.target.files[0];
              const url = URL.createObjectURL(file);
              const type = file.type;

              // розпізнаємо тип
              const isImage = type.startsWith("image");
              const isAudio = type.startsWith("audio");
              const isVideo = type.startsWith("video");

              if (isImage || isAudio || isVideo) {
                // 🔹 стандартні типи, які MessageInput підтримує
                messageDb.send(chatId, currentUserId, {
                  kind: isImage ? "image" : isAudio ? "audio" : "video",
                  url,
                  mimeType: file.type,
                  sizeBytes: file.size,
                });
              } else {
                // 🔹 непідтримані типи — зберігаємо як текст з посиланням
                const fakeLink = `file://${file.name}`;
                messageDb.send(chatId, currentUserId, {
                  kind: "text",
                  text: `📎 ${file.name}`,
                });
                // додатково — можна зберегти метадані у LocalStorage чи IndexedDB, якщо треба
              }

              setMessages(messageDb.listByChat(chatId));
            }}
          />
        </label>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Напишіть повідомлення..."
          className="flex-1 text-sm"
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
