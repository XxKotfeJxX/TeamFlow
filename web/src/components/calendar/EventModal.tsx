// src/components/EventModal.tsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Event } from "../../models/mockDB/calendar";
import { tasks as allTasks } from "../../models/mockDB/calendar";
import { userDb } from "../../models/mockDB/users";
import { useNavigate } from "react-router-dom";

interface EventModalProps {
  event: Event;
  onClose: () => void;
  isPersonalCalendar: boolean;
  onSave?: (updatedEvent: Event) => void;
}

const EventModal: React.FC<EventModalProps> = ({
  event,
  onClose,
  isPersonalCalendar,
}) => {
  const [activeTab, setActiveTab] = useState<
    "main" | "tasks" | "participants" | "settings"
  >("main");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const navigate = useNavigate();

  const handleTaskClick = (taskId: string) => {
    const task = allTasks.find((t) => t.id === taskId);
    if (task) alert(`Таск: ${task.title}`);
  };

  const handleUserClick = (
    userId: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    const clickX = e.clientX;
    const clickY = e.clientY;
    setSelectedUser(userId);
    setContextMenuPos({ x: clickX, y: clickY });
  };

  const handleClickOutside = () => {
    setSelectedUser(null);
    setContextMenuPos(null);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-w-4xl h-3/4 flex overflow-hidden shadow-lg relative">
        {/* Хрестик для закриття */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        {/* Сайдбар вкладок */}
        <div className="w-48 border-r border-gray-300 flex flex-col">
          {["main", "tasks", "participants", "settings"].map((tab) => (
            <button
              key={tab}
              className={`p-4 text-left border-b border-gray-300 text-black ${
                activeTab === tab ? "bg-gray-100" : "hover:bg-gray-50"
              } rounded-none`}
              onClick={() => setActiveTab(tab as typeof activeTab)}
            >
              {tab === "main" && "Основне"}
              {tab === "tasks" && "Таски"}
              {tab === "participants" && "Учасники"}
              {tab === "settings" && "Налаштування"}
            </button>
          ))}
        </div>

        {/* Контент вкладки */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "main" && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {event.title}
              </h2>
              {event.description && (
                <p className="mb-2 text-gray-600">{event.description}</p>
              )}
              <p className="text-sm text-gray-500">
                Календар: {isPersonalCalendar ? "Особистий" : "Командний"}
              </p>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="space-y-2">
              {event.taskIds && event.taskIds.length > 0 ? (
                event.taskIds.map((id) => {
                  const task = allTasks.find((t) => t.id === id);
                  if (!task) return null;
                  return (
                    <div
                      key={id}
                      className="p-2 rounded cursor-pointer transition-colors mt-4"
                      style={{
                        border: `2px solid ${task.color}`,
                        backgroundColor: task.color + "30",
                      }}
                      onClick={() => handleTaskClick(id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          task.color + "50";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          task.color + "30";
                      }}
                    >
                      <strong className="text-gray-500">{task.title}</strong>
                      <div className="text-sm text-gray-400">
                        Термін: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-800 font-semibold">Тасків немає</p>
              )}
            </div>
          )}

          {activeTab === "participants" && (
            <div className="space-y-2 pt-4">
              {event.participants.map((userId) => {
                const user = userDb.getById(userId);
                if (!user) return null;

                return (
                  <div
                    key={user.id}
                    className="flex items-center p-2 border hover:bg-gray-100 cursor-pointer"
                    onClick={(e) => handleUserClick(user.id, e)}
                  >
                    <img
                      src={user.avatarUrl || "/default-avatar.png"}
                      alt={user.username}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {user.username}
                      </span>
                      <span className="text-sm text-gray-500">
                        {user.email}
                      </span>
                    </div>
                    {user.id === event.ownerId && (
                      <span className="ml-auto text-xs text-gray-500 pr-2">
                        адмін
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              {isPersonalCalendar ? (
                <p className="text-gray-800">
                  Налаштування поки що недоступні для особистого календаря
                </p>
              ) : (
                <p>Тут можна змінювати налаштування події</p>
              )}
            </div>
          )}
        </div>

        {/* Контекстне меню для користувача */}
        {selectedUser && contextMenuPos && (
          <div
            className="fixed bg-white p-2 rounded shadow-lg z-50 flex flex-col space-y-2"
            style={{
              top: contextMenuPos.y,
              left: contextMenuPos.x,
              minWidth: 140,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                navigate(`/profile/${selectedUser}`);
                handleClickOutside();
              }}
              className="px-4 py-2 hover:bg-gray-100 rounded text-left text-gray-800"
            >
              Профіль
            </button>
            <button
              onClick={() => {
                alert("Написати повідомлення…");
                handleClickOutside();
              }}
              className="px-4 py-2 hover:bg-gray-100 rounded text-left text-gray-800"
            >
              Написати
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;
