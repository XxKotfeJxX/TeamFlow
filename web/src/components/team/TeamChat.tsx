import React, { useEffect, useState, useRef, useCallback } from "react";
import { chatDb, messageDb, type Message } from "../../models/mockDB/chat";
import { Paperclip, Send, ArrowDown } from "lucide-react";
import { Input } from "../ui/Input";
import { userDb } from "../../models/mockDB/users";
import { useTranslation } from "../useTranslations";

interface TeamChatProps {
  teamId: string;
  currentUserId: string;
}



const TeamChat: React.FC<TeamChatProps> = ({ teamId, currentUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

    const { t } = useTranslation();
    const tp = t("teamPage");

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const formatDateLabel = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const d = date.toDateString();
    if (d === today.toDateString()) return tp("today");
    if (d === yesterday.toDateString()) return tp("yesterday");
    return date.toLocaleDateString("uk-UA");
  };

  useEffect(() => {
    const chat = chatDb.createTeam(teamId);
    setChatId(chat.id);
    const list = messageDb.listByChat(chat.id);
    setMessages(list);
  }, [teamId]);

  useEffect(() => {
    if (!chatId) return;
    const sync = () => setMessages(messageDb.listByChat(chatId));
    const handler = (e: StorageEvent) => {
      if (e.key === "mock_chat_messages_db_v1") sync();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [chatId]);

  const scrollToBottom = useCallback(() => {
    if (document.activeElement && document.activeElement.tagName === "INPUT")
      return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    setShowScrollButton(!isNearBottom);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (isNearBottom) scrollToBottom();
  }, [messages, scrollToBottom]);

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

  const grouped = messages.reduce<Record<string, Message[]>>((acc, msg) => {
    const key = msg.createdAt.toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(msg);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-[500px] overflow-hidden relative">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto mb-4 space-y-3 pr-1 scroll-smooth"
      >
        {Object.entries(grouped).length === 0 && (
          <p className="text-gray-400 text-center mt-16">
            💬 {tp("chatNoMessages")}
          </p>
        )}

        {Object.entries(grouped).map(([dateKey, msgs]) => (
          <div key={dateKey} className="space-y-3 mr-8">
            <div className="text-center text-xs text-gray-400 my-2">
              {formatDateLabel(new Date(dateKey))}
            </div>

            {msgs.map((msg) => {
              const isMine = msg.senderId === currentUserId;
              const sender = !isMine ? userDb.getById(msg.senderId) : null;

              const renderMessageContent = (message: Message) => {
                switch (message.kind) {
                  case "text":
                    return <span>{message.text}</span>;
                  case "image":
                    return (
                      <img
                        src={message.url}
                        alt={message.alt || "image"}
                        className="rounded-lg max-h-60"
                      />
                    );
                  case "audio":
                    return (
                      <audio
                        controls
                        src={message.url}
                        className="mt-1 w-full"
                      />
                    );
                  case "video":
                    return (
                      <video
                        controls
                        src={message.url}
                        className="mt-1 rounded-lg w-full"
                      />
                    );
                  default: {
                    const m = message as Partial<{ url: string }>;
                    return m.url ? (
                      <a
                        href={m.url}
                        download
                        className="text-blue-200 underline break-all"
                      >
                        📎 {tp("chatUploadFile")}
                      </a>
                    ) : (
                      <span className="italic text-gray-400">
                        {tp("chatUnsupported")}
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
                  {!isMine && sender && (
                    <div className="flex flex-col items-center mr-2">
                      {sender.avatarUrl ? (
                        <img
                          src={sender.avatarUrl}
                          alt={sender.username}
                          className="w-8 h-8 rounded-full object-cover mb-1"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700 mb-1">
                          {sender.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-[10px] text-gray-500 truncate w-10 text-center">
                        {sender.username}
                      </span>
                    </div>
                  )}

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

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-6 bg-blue-600 text-white rounded-full p-2 shadow-md hover:bg-blue-700 transition"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}

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
              const isImage = type.startsWith("image");
              const isAudio = type.startsWith("audio");
              const isVideo = type.startsWith("video");

              if (isImage || isAudio || isVideo) {
                messageDb.send(chatId, currentUserId, {
                  kind: isImage ? "image" : isAudio ? "audio" : "video",
                  url,
                  mimeType: file.type,
                  sizeBytes: file.size,
                });
              } else {
                messageDb.send(chatId, currentUserId, {
                  kind: "text",
                  text: `📎 ${file.name}`,
                });
              }
              setMessages(messageDb.listByChat(chatId));
            }}
          />
        </label>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus={false}
          placeholder={tp("chatWritePlaceholder")}
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
