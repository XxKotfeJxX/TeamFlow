import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Task } from "../../models/mockDB/calendar";
import { userDb } from "../../models/mockDB/users";
import { taskDb } from "../../models/mockDB/calendar";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../ui/Checkbox";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onSave?: (updatedTask: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState<
    "main" | "participants" | "settings"
  >("main");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [participants, setParticipants] = useState<string[]>(
    task.assignedUsers || []
  );
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("currentUserId") || "u1";
  const ownerId = participants[0]; // власник — перший у списку
  const isOwner = ownerId === currentUserId;

  // ===== Контекстне меню =====
  const handleUserClick = (
    userId: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
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

  // ===== Зберегти оновлених учасників =====
  const handleSaveParticipants = (selectedIds: string[]) => {
    const fixed = [ownerId, ...selectedIds.filter((id) => id !== ownerId)];
    const updatedTask = { ...task, assignedUsers: fixed };

    // оновлюємо локально
    taskDb.update(task.id, updatedTask);
    setParticipants(fixed);

    // якщо треба передати наверх — передаємо, але не закриваємо батьківський TaskModal
    if (onSave) onSave(updatedTask);

    // тільки внутрішня модалка закривається
    setShowAddModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-w-3xl h-3/4 flex overflow-hidden shadow-lg relative">
        {/* Хрестик */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black hover:border-gray-200 rounded-full p-1"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        {/* Сайдбар */}
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

        {/* Контент */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "main" && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {task.title}
              </h2>
              {task.description && (
                <p className="mb-2 text-gray-600">{task.description}</p>
              )}
              <p className="text-sm text-gray-500">
                Термін: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          )}

          {activeTab === "participants" && (
            <div className="space-y-3 pt-4">
              {isOwner && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Редагувати учасників
                </button>
              )}

              {participants.length > 0 ? (
                participants.map((userId) => {
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
                      {user.id === ownerId && (
                        <span className="ml-auto text-xs text-gray-500 pr-2">
                          власник
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-800 font-semibold">
                  Відповідальні користувачі відсутні
                </p>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <p className="text-gray-800">Налаштування поки що недоступні</p>
            </div>
          )}
        </div>

        {/* Контекстне меню */}
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

      {/* ===== Модалка вибору користувачів ===== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto shadow-xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black hover:border-gray-200 rounded-full p-1"
              onClick={() => setShowAddModal(false)}
            >
              <X size={22} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Вибір користувачів
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {userDb.getAll().map((u) => {
                const isOwnerUser = u.id === ownerId;
                return (
                  <Checkbox
                    key={u.id}
                    checked={participants.includes(u.id)}
                    disabled={isOwnerUser}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setParticipants((prev) =>
                        checked
                          ? [...prev, u.id]
                          : prev.filter((id) => id !== u.id)
                      );
                    }}
                    label={
                      <div className="flex items-center gap-2">
                        <img
                          src={u.avatarUrl || "/default-avatar.png"}
                          alt={u.username}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">
                            {u.username}
                            {isOwnerUser && (
                              <span className="ml-1 text-xs text-gray-500">
                                (власник)
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-gray-500">
                            {u.email}
                          </span>
                        </div>
                      </div>
                    }
                  />
                );
              })}
            </div>

            <button
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => handleSaveParticipants(participants)}
            >
              Зберегти
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskModal;
