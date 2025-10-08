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
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);
  const [color, setColor] = useState("#33C3FF");
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);

  const handleCreate = () => {
    if (!title.trim()) {
      alert("Вкажіть назву");
      return;
    }

    if (type === "task") {
      const newTask: Task = {
        id: "ta" + Date.now(),
        title,
        description,
        dueDate: endDate,
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
        startDate,
        endDate,
        color,
        priority: { personal: 1, team: 1 },
        participants: assignedUsers,
        calendarId,
        ownerId: "u1", // замінити на поточного користувача
        recurring: { isRecurring: false, periodDays: 0 },
        status: "active",
        tags: [],
        taskIds: [],
      };
      onCreate(newEvent);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-w-2xl h-3/4 flex overflow-hidden shadow-lg relative">
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
        <div className="flex-1 p-6 overflow-y-auto mt-4">
          {activeTab === "main" && (
            <div className="space-y-4">
              {/* Вибір типу для командного календаря */}
              {calendarType === "team" && (
  <Select value={type} onChange={(e) => setType(e.target.value as "task" | "event")}>
    <SelectItem value="task">Таск</SelectItem>
    <SelectItem value="event">Подія</SelectItem>
  </Select>
                          )}
                          

                          {/* Назва та опис */}
                          <Label>Дата та час:</Label>
              <Input
  placeholder="Назва"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
                          />
                          <Label>Дата та час:</Label>
              <Textarea
                              placeholder="Опис"
                              height={150}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>


              {/* Дата та час для події */}
              {type === "task" && (
  <>
    <Label>Час:</Label>
    <Input
      type="time"
      value={endDate.toTimeString().slice(0, 5)} // "HH:MM"
      onChange={(e) => {
        const [hours, minutes] = e.target.value.split(":").map(Number);
        const newEndDate = new Date(endDate);
        newEndDate.setHours(hours, minutes);
        setEndDate(newEndDate);
      }}
      className="border rounded p-2 w-full"
    />
  </>
)}

{type === "event" && (
  <>
    <Label>Початок:</Label>
    <Input
      type="datetime-local"
      value={startDate.toISOString().slice(0, 16)}
      onChange={(e) => setStartDate(new Date(e.target.value))}
      className="border rounded p-2 w-full"
    />
    <Label>Кінець:</Label>
    <Input
      type="datetime-local"
      value={endDate.toISOString().slice(0, 16)}
      onChange={(e) => setEndDate(new Date(e.target.value))}
      className="border rounded p-2 w-full"
    />
  </>
)}


                          {/* Колір */}
                          <Label>Колір:</Label>
              <Input
  type="color"
  value={color}
  onChange={(e) => setColor(e.target.value)}
/>


              {/* Кнопка створення */}
              <Button
  variant="default"
  size="default"
  onClick={handleCreate}
  className="mt-4 w-full"
>
  Створити
</Button>
            </div>
          )}

          {activeTab === "participants" && (
            <div>
              <p>Учасники (реалізація через userDb)</p>
              {/* Тут можна додати чекбокси або список користувачів */}
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
