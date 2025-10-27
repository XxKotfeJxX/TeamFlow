import React, { useState } from "react";
import { Plus } from "lucide-react";
import TemplateSelectModal from "./TemplateSelectModal";
import { useTranslation } from "../useTranslations";

interface AddCardButtonProps {
  onAdd: (templateId: string) => void;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const ta = t("cards");

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 transition"
      >
        <Plus size={18} /> {ta("addButton")}
      </button>

      <TemplateSelectModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSelect={(tplId) => onAdd(tplId)}
      />
    </div>
  );
};

export default AddCardButton;
