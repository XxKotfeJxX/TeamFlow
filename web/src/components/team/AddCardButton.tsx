import React from "react";
import { Plus } from "lucide-react";

interface AddCardButtonProps {
  onAdd: (type: string) => void;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ onAdd }) => (
  <div className="flex justify-center mt-6">
    <button
      onClick={() => onAdd("text")}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 transition"
    >
      <Plus size={18} /> Додати картку
    </button>
  </div>
);

export default AddCardButton;
