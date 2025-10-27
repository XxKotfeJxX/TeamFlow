// src/components/calendar/CreateItemModal.tsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { userDb } from "../../models/mockDB/users";
import type { Event, Task } from "../../models/mockDB/calendar";
import { Select, SelectItem } from "../ui/Select";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { CustomTimePicker, CustomDatePicker } from "../ui/DateTimePicker";
import { Checkbox } from "../ui/Checkbox";
import { useTranslation } from "../useTranslations";

interface CreateItemModalProps {
  calendarId: string;
  calendarType: "user" | "team";
  date: Date;
  onClose: () => void;
  onCreate: (item: Event | Task) => void;
}

const CreateItemModal: React.FC<CreateItemModalProps> = ({
  calendarId,
  calendarType,
  date,
  onClose,
  onCreate,
}) => {
  const [activeTab, setActiveTab] = useState<
    "main" | "participants" | "settings"
  >("main");
  const [type, setType] = useState<"event" | "task">(
    calendarType === "user" ? "task" : "event"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(date.toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState(date.toTimeString().slice(0, 5));
  const [endDate, setEndDate] = useState(date.toISOString().slice(0, 10));
  const [endTime, setEndTime] = useState(date.toTimeString().slice(0, 5));
  const [color, setColor] = useState("#33C3FF");
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");

  const currentUserId = localStorage.getItem("currentUserId") || "u1";
  const allUsers = userDb.getAll();

  const { t } = useTranslation();
  const tc = t("createItemModal");


  const titleRef = React.useRef<HTMLInputElement>(null);
  const startDateRef = React.useRef<HTMLDivElement>(null);

  const handleCreate = () => {
    let hasError = false;

    if (!title.trim()) {
      setTitleError(tc("errorTitleRequired"));
      hasError = true;
      titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setTitleError("");
    }

    const [sy, sm, sd] = startDate.split("-").map(Number);
    const [sh, smin] = startTime.split(":").map(Number);
    const start = new Date(sy, sm - 1, sd, sh, smin);

    const [ey, em, ed] = endDate.split("-").map(Number);
    const [eh, emin] = endTime.split(":").map(Number);
    const end = new Date(ey, em - 1, ed, eh, emin);

    if (type === "event" && start > end) {
      setDateError(tc("errorInvalidDate"));
      hasError = true;
      startDateRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      setDateError("");
    }

    if (hasError) return;

    const participantsList = Array.from(
      new Set([currentUserId, ...assignedUsers])
    );

    if (type === "task") {
      const newTask: Task = {
        id: "ta" + Date.now(),
        title,
        description,
        dueDate: end,
        color,
        priority: { personal: 1, team: 1 },
        recurring: { isRecurring: false, periodDays: 0 },
        assignedUsers: participantsList,
        type: calendarType === "user" ? "personal" : "team",
        status: "inProgress",
        calendarId,
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onCreate(newTask);
    } else {
      const newEvent: Event = {
        id: "e" + Date.now(),
        title,
        description,
        startDate: start,
        endDate: end,
        color,
        priority: { personal: 1, team: 1 },
        participants: participantsList,
        calendarId,
        ownerId: currentUserId,
        recurring: { isRecurring: false, periodDays: 0 },
        status: "active",
        tags: [],
        taskIds: [],
      };
      onCreate(newEvent);
    }

    onClose();
  };

  const handleFixDate = () => {
    const [sy, sm, sd] = startDate.split("-").map(Number);
    const [sh, smin] = startTime.split(":").map(Number);
    const start = new Date(sy, sm - 1, sd, sh, smin);
    const fixedEnd = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    setEndDate(fixedEnd.toISOString().slice(0, 10));
    setEndTime(fixedEnd.toTimeString().slice(0, 5));
    setDateError("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div
        className="
          bg-white rounded-lg shadow-lg relative flex overflow-hidden
          w-[90%] h-[90%] max-w-2xl
          md:w-3/4 md:h-3/4
          flex-col md:flex-row
        "
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black z-50 hover:border-gray-300 rounded-full p-1 transition-colors"
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
        border-b border-gray-300 text-gray-700
        rounded-none
        ${activeTab === tab ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}
      `}
              onClick={() => setActiveTab(tab as typeof activeTab)}
            >
              {tab === "main" && tc("tabMain")}
              {tab === "participants" && tc("tabParticipants")}
              {tab === "settings" && tc("tabSettings")}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {activeTab === "main" && (
            <div className="space-y-4">
              {calendarType === "team" && <Label>{tc("fieldType")}:</Label> && (
                <Select
                  className="mb-4"
                  value={type}
                  onChange={(e) => setType(e.target.value as "task" | "event")}
                >
                  <SelectItem value="task">{tc("typeTask")}</SelectItem>
                  <SelectItem value="event">{tc("typeEvent")}</SelectItem>
                </Select>
              )}

              <Label>{tc("fieldTitle")}:</Label>
              <Input
                ref={titleRef}
                placeholder={tc("fieldTitle")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {titleError && (
                <p className="text-red-600 text-sm pb-4">{titleError}</p>
              )}

              <Label>{tc("fieldDescription")}:</Label>
              <Textarea
                placeholder={tc("fieldDescription")}
                height={150}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {type === "task" && (
                <>
                  <Label>{tc("fieldDuration")}:</Label>
                  <CustomTimePicker value={endTime} onChange={setEndTime} />
                </>
              )}

              {type === "event" && (
                <div ref={startDateRef}>
                  <Label>{tc("fieldStart")}:</Label>
                  <CustomDatePicker
                    value={startDate.split("-").reverse().join(".")}
                    onChange={(date) => {
                      if (!date) return;
                      const [d, m, y] = date.split(".");
                      setStartDate(`${y}-${m}-${d}`);
                    }}
                  />
                  <CustomTimePicker value={startTime} onChange={setStartTime} />

                  <Label>{tc("fieldEnd")}:</Label>
                  <CustomDatePicker
                    value={endDate.split("-").reverse().join(".")}
                    onChange={(date) => {
                      if (!date) return;
                      const [d, m, y] = date.split(".");
                      setEndDate(`${y}-${m}-${d}`);
                    }}
                  />
                  <CustomTimePicker value={endTime} onChange={setEndTime} />

                  {dateError && (
                    <div className="mt-2 text-red-600 flex items-center gap-2">
                      <span>{dateError}</span>
                      <button
                        className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        onClick={handleFixDate}
                      >
                        {tc("actionFixDate")}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <Label>{tc("fieldColor")}:</Label>
              <Input
                className="px-0 py-0 h-10 cursor-pointer"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />

              <Button
                variant="default"
                size="default"
                onClick={handleCreate}
                className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                {tc("actionSave")}
              </Button>
            </div>
          )}

          {activeTab === "participants" && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 mb-2">
                {tc("actionSelectParticipants")}
              </h3>
              {allUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 border p-2 rounded hover:bg-gray-50"
                >
                  <Checkbox
                    checked={assignedUsers.includes(user.id)}
                    disabled={user.id === currentUserId}
                    onChange={(e) => {
                      if (e.target.checked)
                        setAssignedUsers((prev) => [...prev, user.id]);
                      else
                        setAssignedUsers((prev) =>
                          prev.filter((id) => id !== user.id)
                        );
                    }}
                    label={
                      <div className="flex items-center gap-2">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-semibold uppercase">
                            {user.username?.charAt(0) || "?"}
                          </div>
                        )}
                        <span className="text-gray-800">{user.username}</span>
                        {user.id === currentUserId && (
                          <span className="ml-auto text-xs text-gray-500">
                            {tc("actionYou")}
                          </span>
                        )}
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <p className="text-gray-700">
                {tc("settingsNote")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateItemModal;
