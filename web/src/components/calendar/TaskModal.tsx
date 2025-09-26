import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Task } from "../../models/mockDB/calendar";
import { userDb } from "../../models/mockDB/users";
import { useNavigate } from "react-router-dom";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const [activeTab, setActiveTab] = useState<"main" | "participants" | "settings">("main");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);

  const navigate = useNavigate();

  const handleUserClick = (userId: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedUser(userId);
    setContextMenuPos({ x: e.clientX, y: e.clientY });
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
      <div className="bg-white rounded-lg w-3/4 max-w-3xl h-3/4 flex overflow-hidden shadow-lg relative">
        {/* Хрестик для закриття */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        {/* Сайдбар вкладок */}
        <div className="w-48 border-r border-gray-300 flex flex-col">
          {["main", "participants", "settings"].map((tab) => (
            <button
              key={tab}
              className={`p-4 text-left border-b border-gray-300 text-black ${
                activeTab === tab ? "bg-gray-100" : "hover:bg-gray-50"
              } rounded-none`}
              onClick={() => setActiveTab(tab as typeof activeTab)}
            >
              {tab === "main" && "Основне"}
              {tab === "participants" && "Учасники"}
              {tab === "settings" && "Налаштування"}
            </button>
          ))}
        </div>

        {/* Контент вкладки */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "main" && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{task.title}</h2>
              {task.description && <p className="mb-2 text-gray-600">{task.description}</p>}
              <p className="text-sm text-gray-500">
                Термін: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          )}

          {activeTab === "participants" && (
            <div className="space-y-2 pt-4">
              {task.assignedUsers && task.assignedUsers.length > 0 ? (
                task.assignedUsers.map((userId) => {
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
                        <span className="font-semibold text-gray-800">{user.username}</span>
                        <span className="text-sm text-gray-500">{user.email}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-800 font-semibold">Відповідальні користувачі відсутні</p>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <p className="text-gray-800">Налаштування поки що недоступні</p>
            </div>
          )}
        </div>

        {/* Контекстне меню для користувача */}
        {selectedUser && contextMenuPos && (
          <div
            className="fixed bg-white p-2 rounded shadow-lg z-50 flex flex-col space-y-2"
            style={{ top: contextMenuPos.y, left: contextMenuPos.x, minWidth: 140 }}
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

export default TaskModal;
