import React, { useState, useMemo } from "react";
import { X } from "lucide-react";
import { users } from "../../models/mockDB/users";
import { Checkbox } from "../ui/Checkbox";
import { teamDb } from "../../models/mockDB/teams";

interface AddMemberModalProps {
  isOpen: boolean;
  teamId: string;
  onClose: () => void;
  onAdded?: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  teamId,
  onClose,
  onAdded,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const team = teamDb.getById(teamId);

  const availableUsers = useMemo(() => {
    if (!team) return [];
    const memberIds = team.members.map((m) => m.userId);
    return users.filter((u) => !memberIds.includes(u.id));
  }, [team]);

  const toggleSelect = (userId: string) => {
    setSelected((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAdd = () => {
    selected.forEach((userId) => {
      teamDb.addMember(teamId, userId, "member");
    });
    if (onAdded) onAdded();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-lg p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Додати учасників
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition hover:border-gray-300 rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-3">
          {availableUsers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Усі користувачі вже в команді 🎉
            </p>
          ) : (
            availableUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-2 transition"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={u.avatarUrl || "https://i.pravatar.cc/100?u=" + u.id}
                    alt={u.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">
                      {u.fullname || u.username}
                    </p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                </div>
                <Checkbox
                  checked={selected.includes(u.id)}
                  onChange={() => toggleSelect(u.id)}
                />
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 hover:border-gray-300"
          >
            Скасувати
          </button>
          <button
            disabled={selected.length === 0}
            onClick={handleAdd}
            className={`px-4 py-2 rounded-xl text-white ${
              selected.length === 0
                ? "bg-blue-300 cursor-not-allowed hover:border-blue-300"
                : "bg-blue-600 hover:bg-blue-700 hover:border-blue-800"
            }`}
          >
            Додати {selected.length > 0 && `(${selected.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
