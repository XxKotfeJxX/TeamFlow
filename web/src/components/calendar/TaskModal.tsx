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
  const ownerId = participants[0];
  const isOwner = ownerId === currentUserId;

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedUser(null);
      setContextMenuPos(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleUserClick = (
    userId: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setSelectedUser(userId);
    setContextMenuPos({ x: e.clientX, y: e.clientY });
  };

  const handleSaveParticipants = (selectedIds: string[]) => {
    const fixed = [ownerId, ...selectedIds.filter((id) => id !== ownerId)];
    const updatedTask = { ...task, assignedUsers: fixed };
    taskDb.update(task.id, updatedTask);
    setParticipants(fixed);
    if (onSave) onSave(updatedTask);
    setShowAddModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div
        className="
          bg-white rounded-lg shadow-lg relative flex overflow-hidden
          w-[90%] h-[90%] max-w-3xl
          md:w-3/4 md:h-3/4
          flex-col md:flex-row
        "
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black hover:border-gray-200 rounded-full p-1"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div
          className="
            flex border-b md:border-b-0 md:border-r border-gray-300
            md:flex-col w-full md:w-48 mt-12
          "
        >
          {["main", "participants", "settings"].map((tab) => (
            <button
              key={tab}
              className={`
                flex-1 md:flex-none p-3 md:p-4 text-center md:text-left
                border-b border-gray-300 text-gray-700 rounded-none
                ${
                  activeTab === tab
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }
              `}
              onClick={() => setActiveTab(tab as typeof activeTab)}
            >
              {tab === "main" && "Основне"}
              {tab === "participants" && "Учасники"}
              {tab === "settings" && "Налаштування"}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
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
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto"
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
                      className="flex items-center p-2 border rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => handleUserClick(user.id, e)}
                    >
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.username}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
                          {user.username?.charAt(0).toUpperCase() || "?"}
                        </div>
                      )}
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
                setSelectedUser(null);
                setContextMenuPos(null);
              }}
              className="px-4 py-2 hover:bg-gray-100 rounded text-left text-gray-800"
            >
              Профіль
            </button>
            <button
              onClick={() => {
                alert("Написати повідомлення…");
                setSelectedUser(null);
                setContextMenuPos(null);
              }}
              className="px-4 py-2 hover:bg-gray-100 rounded text-left text-gray-800"
            >
              Написати
            </button>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
          <div
            className="
              bg-white rounded-lg p-6 w-[90%] md:w-[600px] max-h-[80vh]
              overflow-y-auto shadow-xl relative
            "
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black hover:border-gray-200 rounded-full p-1"
              onClick={() => setShowAddModal(false)}
            >
              <X size={22} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Вибір користувачів
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        {u.avatarUrl ? (
                          <img
                            src={u.avatarUrl}
                            alt={u.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                            {u.username?.charAt(0).toUpperCase() || "?"}
                          </div>
                        )}
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
