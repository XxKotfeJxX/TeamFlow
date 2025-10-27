import React, { useState } from "react";
import { Pencil, Check, X, Trash2 } from "lucide-react";
import type { ProfileTemplate } from "../../models/mockDB/profiletemplates";
import type { TeamProfileBlock } from "../../models/mockDB/teams";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { teamProfileDb } from "../../models/mockDB/teams";
import { useTranslation } from "../useTranslations";
import type {translations} from "../../models/i18n"

interface EditableCardProps {
  block: TeamProfileBlock;
  template: ProfileTemplate;
  onSave: (updatedBlock: TeamProfileBlock) => void;
  onDelete?: () => void;
  canEdit?: boolean;
}

const EditableCard: React.FC<EditableCardProps> = ({
  block,
  template,
  onSave,
  onDelete,
  canEdit = false,
}) => {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState<Record<string, unknown>>(block.data || {});
  const { t } = useTranslation();
  const te = t("editableCard");
  const tp = t("profileTemplates"); // переклад назв полів шаблону

  const save = () => {
    if (!canEdit) return;
    const updatedBlock: TeamProfileBlock = {
      ...block,
      data,
      updatedAt: new Date(),
    };
    teamProfileDb.update(updatedBlock.id, updatedBlock);
    onSave(updatedBlock);
    setEditing(false);
  };

  const handleDelete = () => {
    if (!canEdit || !onDelete) return;
    if (confirm(te("confirmDelete"))) onDelete();
  };

  return (
    <div
      className="relative bg-white rounded-2xl shadow-sm p-6 transition pt-12"
      style={template.styles as React.CSSProperties}
    >
      {canEdit && (
        <div className="absolute top-3 right-3 flex gap-2">
          {editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="text-gray-400 hover:text-gray-600 rounded-full p-1"
                title={te("cancel")}
              >
                <X size={18} />
              </button>
              <button
                onClick={save}
                className="text-blue-600 hover:text-blue-700 rounded-full p-1"
                title={te("save")}
              >
                <Check size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => canEdit && setEditing(true)}
                className="text-gray-400 hover:text-blue-600 rounded-full p-1"
                title={te("edit")}
              >
                <Pencil size={18} />
              </button>
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="text-gray-400 hover:text-red-600 rounded-full p-1"
                  title={te("delete")}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Відображення / редагування контенту */}
      {!editing ? (
        <>
          {template.fields.map((field) => {
            const value = data[field.key];
            if (!value) return null;

            switch (field.type) {
              case "text":
                return (
                  <p
                    key={field.key}
                    className="text-gray-800 text-base font-medium mb-2"
                  >
                    {value as string}
                  </p>
                );

              case "textarea":
                return (
                  <p
                    key={field.key}
                    className="text-gray-600 whitespace-pre-line mb-2"
                  >
                    {value as string}
                  </p>
                );

              case "list":
                return (
                  <ul
                    key={field.key}
                    className="list-disc list-inside text-gray-600 space-y-1 mb-2"
                  >
                    {(value as string[])?.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                );

              case "linkList":
                return (
                  <ul
                    key={field.key}
                    className="text-blue-600 space-y-1 mb-2 underline-offset-2"
                  >
                    {(value as { label: string; url: string }[])?.map(
                      (l, idx) => (
                        <li key={idx}>
                          <a
                            href={l.url}
                            className="hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {l.label}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                );

              case "image":
                return (
                  <div key={field.key} className="flex flex-wrap gap-2 mb-2">
                    {(value as string[])?.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`img-${idx}`}
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                );

              default:
                return null;
            }
          })}
        </>
      ) : (
        <>
          {template.fields.map((field) => {
            const value = data[field.key];
            const label = tp(
              field.labelKey as keyof (typeof translations)["uk"]["profileTemplates"]
            );


            switch (field.type) {
              case "text":
                return (
                  <Input
                    key={field.key}
                    value={(value as string) || ""}
                    onChange={(e) =>
                      setData({ ...data, [field.key]: e.target.value })
                    }
                    placeholder={label}
                    className="mb-3"
                  />
                );

              case "textarea":
                return (
                  <Textarea
                    key={field.key}
                    value={(value as string) || ""}
                    onChange={(e) =>
                      setData({ ...data, [field.key]: e.target.value })
                    }
                    placeholder={label}
                    className="mb-3 h-24"
                  />
                );

              case "list":
                return (
                  <Textarea
                    key={field.key}
                    value={(value as string[])?.join("\n") || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        [field.key]: e.target.value.split("\n"),
                      })
                    }
                    placeholder={`${label} (${te("onePerLine")})`}
                    className="mb-3 h-24"
                  />
                );

              case "linkList":
                return (
                  <Textarea
                    key={field.key}
                    value={
                      (value as { label: string; url: string }[])
                        ?.map((l) => `${l.label}|${l.url}`)
                        .join("\n") || ""
                    }
                    onChange={(e) => {
                      const parsed = e.target.value
                        .split("\n")
                        .filter(Boolean)
                        .map((line) => {
                          const [labelText, url] = line.split("|");
                          return {
                            label: labelText?.trim() || "",
                            url: url?.trim() || "",
                          };
                        });
                      setData({ ...data, [field.key]: parsed });
                    }}
                    placeholder={`${label} (${te("linkFormat")})`}
                    className="mb-3 h-24"
                  />
                );

              case "image":
                return (
                  <div key={field.key} className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      {label}
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        const urls = Array.from(files).map((file) =>
                          URL.createObjectURL(file)
                        );
                        setData({ ...data, [field.key]: urls });
                      }}
                      className="block w-full text-sm text-gray-500 
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-lg file:border-0 file:text-sm 
                                 file:font-semibold file:bg-blue-50 
                                 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(value as string[])?.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`preview-${idx}`}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })}
        </>
      )}
    </div>
  );
};

export default EditableCard;
