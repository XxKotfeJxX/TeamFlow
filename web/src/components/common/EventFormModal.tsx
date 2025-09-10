import React, { useState } from "react";

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    startTime: string;
    endTime: string;
    description?: string;
  }) => void;
}

const EventFormModal: React.FC<EventFormModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Створити подію</h3>
        <input
          className="w-full border rounded-lg p-2 mb-3"
          placeholder="Назва"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border rounded-lg p-2 mb-3"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          className="w-full border rounded-lg p-2 mb-3"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <textarea
          className="w-full border rounded-lg p-2 mb-3"
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200">
            Скасувати
          </button>
          <button
            onClick={() => {
              onSave({ title, startTime, endTime, description });
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
