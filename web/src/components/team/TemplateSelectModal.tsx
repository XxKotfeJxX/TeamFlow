import React from "react";
import { X } from "lucide-react";
import { profileTemplateDb } from "../../models/mockDB/profiletemplates";
import { useTranslation } from "../useTranslations";
import type { translations } from "../../models/i18n";

interface TemplateSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

const TemplateSelectModal: React.FC<TemplateSelectModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { t } = useTranslation();
  const tt = t("templates");
  const tp = t("profileTemplates");

  if (!isOpen) return null;

  const templates = profileTemplateDb.getAll();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {tt("selectTemplate")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => {
                onSelect(tpl.id);
                onClose();
              }}
              className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="text-3xl">{tpl.icon}</div>

              <div className="text-gray-800 font-medium text-center">
                {tp(
                  tpl.displayNameKey as keyof (typeof translations)["uk"]["profileTemplates"]
                )}
              </div>

              {tpl.descriptionKey && (
                <p className="text-gray-500 text-sm text-center">
                  {tp(
                    tpl.descriptionKey as keyof (typeof translations)["uk"]["profileTemplates"]
                  )}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectModal;
