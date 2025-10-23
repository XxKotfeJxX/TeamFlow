import React, { useState } from "react";
import { Pencil, Check, X, Trash2 } from "lucide-react";
import type { ProfileTemplate } from "../../models/mockDB/profiletemplates";
import type { TeamProfileBlock } from "../../models/mockDB/teams";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { teamProfileDb } from "../../models/mockDB/teams";

interface EditableCardProps {
  block: TeamProfileBlock;
  template: ProfileTemplate;
  onSave: (updatedBlock: TeamProfileBlock) => void;
  onDelete?: () => void;
  canEdit?: boolean; // 🔹 контролює права на редагування
}

const EditableCard: React.FC<EditableCardProps> = ({
  block,
  template,
  onSave,
  onDelete,
  canEdit = false, // 🔹 значення за замовчуванням — не можна редагувати
}) => {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState<Record<string, unknown>>(block.data || {});

  // 🔹 Зберегти зміни в БД + локально
  const save = () => {
    if (!canEdit) return; // ❌ захист від редагування через консоль
    const updatedBlock: TeamProfileBlock = {
      ...block,
      data,
      updatedAt: new Date(),
    };
    teamProfileDb.update(updatedBlock.id, updatedBlock);
    onSave(updatedBlock);
    setEditing(false);
  };

  // 🔹 Видалити блок
  const handleDelete = () => {
    if (!canEdit || !onDelete) return;
    if (confirm("Видалити цей блок?")) onDelete();
  };

  return (
    <div
      className="relative bg-white rounded-2xl shadow-sm p-6 transition pt-12"
      style={template.styles as React.CSSProperties}
    >
      {/* 🔸 Кнопки дій — тільки якщо canEdit === true */}
      {canEdit && (
        <div className="absolute top-3 right-3 flex gap-2">
          {editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="text-gray-400 hover:text-gray-600 hover:border-gray-600 rounded-full p-1"
                title="Скасувати"
              >
                <X size={18} />
              </button>
              <button
                onClick={save}
                className="text-blue-600 hover:text-blue-700 hover:border-blue-700 rounded-full p-1"
                title="Зберегти"
              >
                <Check size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => canEdit && setEditing(true)}
                className="text-gray-400 hover:text-blue-600 hover:border-blue-600 rounded-full p-1"
                title="Редагувати"
              >
                <Pencil size={18} />
              </button>
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="text-gray-400 hover:text-red-600 hover:border-red-600 rounded-full p-1"
                  title="Видалити"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* ===== РЕЖИМ ПРОСМОТРУ ===== */}
      {!editing ? (
        <>
          {template.fields.map((field) => {
            const value = data[field.key];

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
                    {(value as string[] | undefined)?.map((i, idx) => (
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
                    {(
                      value as { label: string; url: string }[] | undefined
                    )?.map((l, idx) => (
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
                    ))}
                  </ul>
                );
              case "image":
                return (
                  <div key={field.key} className="flex flex-wrap gap-2 mb-2">
                    {(value as string[] | undefined)?.map((src, idx) => (
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
          {/* ===== РЕЖИМ РЕДАГУВАННЯ ===== */}
          {template.fields.map((field) => {
            const value = data[field.key];

            switch (field.type) {
              case "text":
                return (
                  <Input
                    key={field.key}
                    value={(value as string) || ""}
                    onChange={(e) =>
                      setData({ ...data, [field.key]: e.target.value })
                    }
                    placeholder={field.label}
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
                    placeholder={field.label}
                    className="mb-3 h-24"
                  />
                );
              case "list":
                return (
                  <Textarea
                    key={field.key}
                    value={(value as string[] | undefined)?.join("\n") || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        [field.key]: e.target.value.split("\n"),
                      })
                    }
                    placeholder={`${field.label} (кожен пункт з нового рядка)`}
                    className="mb-3 h-24"
                  />
                );
              case "linkList":
                return (
                  <Textarea
                    key={field.key}
                    value={
                      (value as { label: string; url: string }[] | undefined)
                        ?.map((l) => `${l.label}|${l.url}`)
                        .join("\n") || ""
                    }
                    onChange={(e) => {
                      const parsed = e.target.value
                        .split("\n")
                        .filter(Boolean)
                        .map((line) => {
                          const [label, url] = line.split("|");
                          return { label, url };
                        });
                      setData({ ...data, [field.key]: parsed });
                    }}
                    placeholder={`${field.label} (формат: Назва|URL)`}
                    className="mb-3 h-24"
                  />
                );
              case "image":
                return (
                  <div key={field.key} className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      {field.label}
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
                      {(value as string[] | undefined)?.map((src, idx) => (
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
