// src/components/EventModal.tsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Event } from "../../models/mockDB/calendar";
import { tasks as allTasks, eventDb } from "../../models/mockDB/calendar";
import { userDb } from "../../models/mockDB/users";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../ui/Checkbox";
import { useTranslation } from "../useTranslations";

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
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<
    "main" | "tasks" | "participants" | "settings"
    >("main");
  
  const { t } = useTranslation();
  const te = t("eventModal");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [participants, setParticipants] = useState<string[]>(
    event.participants || []
  );
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("currentUserId") || "u1";
  const isOwner = event.ownerId === currentUserId;

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

  const handleSaveParticipants = (selectedIds: string[]) => {
    const fixed = [
      event.ownerId,
      ...selectedIds.filter((id) => id !== event.ownerId),
    ];
    const updatedEvent = { ...event, participants: fixed };

    eventDb.update(event.id, updatedEvent);
    setParticipants(fixed);
    onSave?.(updatedEvent);
    setShowAddModal(false);
  };

  const handleTaskClick = (taskId: string) => {
    const task = allTasks.find((t) => t.id === taskId);
    if (task) alert(`Таск: ${task.title}`);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div
        className="
          bg-white rounded-lg shadow-lg relative flex overflow-hidden
          w-[90%] h-[90%] max-w-4xl
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
          {["main", "tasks", "participants", "settings"].map((tab) => (
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
              {tab === "main" && te("tabMain")}
              {tab === "tasks" && te("tabTasks")}
              {tab === "participants" && te("tabParticipants")}
              {tab === "settings" && te("tabSettings")}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {activeTab === "main" && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {event.title}
              </h2>
              {event.description && (
                <p className="mb-2 text-gray-600">{event.description}</p>
              )}
              <p className="text-sm text-gray-500">
                {te("calendarLabel")}:
                {isPersonalCalendar ? "Особистий" : "Командний"}
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
                      <strong className="text-gray-700">{task.title}</strong>
                      <div className="text-sm text-gray-500">
                        Термін: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-800 font-semibold">{te("tasksNone")}</p>
              )}
            </div>
          )}

          {activeTab === "participants" && (
            <div className="space-y-3 pt-4">
              {isOwner && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto"
                >
                  {te("participantsEdit")}
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
                      {user.id === event.ownerId && (
                        <span className="ml-auto text-xs text-gray-500 pr-2">
                          {te("owner")}
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-800 font-semibold">
                  {te("participantsNone")}
                </p>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <p>
                {isPersonalCalendar
                  ? te("settingsUnavailablePersonal")
                  : te("settingsAvailableTeam")}
              </p>
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
                handleClickOutside();
              }}
              className="px-4 py-2 hover:bg-gray-100 rounded text-left text-gray-800"
            >
              {te("profile")}
            </button>
            <button
              onClick={() => {
                alert("Написати повідомлення…");
                handleClickOutside();
              }}
              className="px-4 py-2 hover:bg-gray-100 rounded text-left text-gray-800"
            >
              {te("profile")}
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
              {te("participantsEditTitle")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userDb.getAll().map((u) => {
                const isOwnerUser = u.id === event.ownerId;
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
                                ({te("owner")})
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
              {te("save")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventModal;
