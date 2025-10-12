// src/components/calendar/CreateItemModal.tsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { userDb } from "../../models/mockDB/users";
import type { Event, Task } from "../../models/mockDB/calendar";
import { Select, SelectItem } from "../ui/Select";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/Label";
import { CustomTimePicker, CustomDatePicker } from "../ui/DateTimePicker";

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
  const [activeTab, setActiveTab] = useState<"main" | "participants" | "settings">("main");
  const [type, setType] = useState<"event" | "task">(calendarType === "user" ? "task" : "event");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(date.toISOString().slice(0, 10)); // "yyyy-mm-dd"
  const [startTime, setStartTime] = useState(date.toTimeString().slice(0, 5)); // "HH:mm"
  const [endDate, setEndDate] = useState(date.toISOString().slice(0, 10));
  const [endTime, setEndTime] = useState(date.toTimeString().slice(0, 5));
  const [color, setColor] = useState("#33C3FF");
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  const [titleError, setTitleError] = useState(""); 
  const [dateError, setDateError] = useState("");  

  const titleRef = React.useRef<HTMLInputElement>(null);
  const startDateRef = React.useRef<HTMLDivElement>(null);

  const handleCreate = () => {
    let hasError = false;

    if (!title.trim()) {
      setTitleError("Вкажіть назву");
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
      setDateError("Дата початку не може бути після дати кінця");
      hasError = true;
      startDateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setDateError("");
    }

    if (hasError) return;

    if (type === "task") {
      const newTask: Task = {
        id: "ta" + Date.now(),
        title,
        description,
        dueDate: end,
        color,
        priority: { personal: 1, team: 1 },
        recurring: { isRecurring: false, periodDays: 0 },
        assignedUsers,
        type: calendarType === "user" ? "personal" : "team",
        status: "inProgress",
        calendarId,
        tags: [],
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
        participants: assignedUsers,
        calendarId,
        ownerId: "u1",
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
      <div className="bg-white rounded-lg w-3/4 max-w-2xl h-3/4 flex overflow-hidden shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black z-50"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

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

        <div className="flex-1 p-6 overflow-y-auto mt-4">
          {activeTab === "main" && (
            <div className="space-y-4">
              {calendarType === "team" && (
                <Select className="mb-4" value={type} onChange={(e) => setType(e.target.value as "task" | "event")}>
                  <SelectItem value="task">Таск</SelectItem>
                  <SelectItem value="event">Подія</SelectItem>
                </Select>
              )}

              <Label>Назва:</Label>
              <Input
                ref={titleRef}
                placeholder="Введіть назву"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {titleError && <p className="text-red-600 text-sm pb-4">{titleError}</p>}

              <Label>Опис:</Label>
              <Textarea
                placeholder="Введіть опис"
                height={150}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {type === "task" && (
                <>
                  <Label>Час виконання:</Label>
                  <CustomTimePicker value={endTime} onChange={setEndTime} />
                </>
              )}

              {type === "event" && (
                <div ref={startDateRef}>
                  <Label>Початок:</Label>
                  <CustomDatePicker
                    value={startDate.split("-").reverse().join(".")}
                    onChange={(date) => {
                      if (!date) return;
                      const [d, m, y] = date.split(".");
                      setStartDate(`${y}-${m}-${d}`);
                    }}
                  />
                  <CustomTimePicker value={startTime} onChange={setStartTime} />

                  <Label>Кінець:</Label>
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
                        Виправити
                      </button>
                    </div>
                  )}
                </div>
              )}

              <Label>Колір:</Label>
              <Input className="px-0 py-0 h-10 cursor-pointer"
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
                Зберегти
              </Button>
            </div>
          )}

          {activeTab === "participants" && (
            <div>
              <p>Учасники (реалізація через userDb)</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <p>Налаштування (повторюваність, статус тощо)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateItemModal;
