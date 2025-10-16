import React, { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

// Типи для контенту картки
interface TextContent {
  title: string;
  body?: string;
}

interface ListContent {
  title: string;
  items: string[];
}

interface LinkItem {
  label: string;
  url: string;
}

interface LinksContent {
  title: string;
  links: LinkItem[];
}

// Єдиний тип для всіх блоків
export type BlockType = "text" | "list" | "links";

export interface TeamProfileBlock {
  id: string;
  type: BlockType;
  content: TextContent | ListContent | LinksContent;
}

// Пропси компонента
interface EditableCardProps {
  block: TeamProfileBlock;
  onSave: (updatedBlock: TeamProfileBlock) => void;
}

const EditableCard: React.FC<EditableCardProps> = ({ block, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(block.content);

  const save = () => {
    onSave({ ...block, content });
    setEditing(false);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm p-6">
      {/* кнопка редагування */}
      <button
        onClick={() => setEditing(!editing)}
        className="absolute top-3 right-3 text-gray-400 hover:text-blue-600"
      >
        <Pencil size={18} />
      </button>

      {/* вміст залежно від типу */}
      {!editing ? (
        <>
          {block.type === "text" && (
            <>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {(content as TextContent).title}
              </h3>
              <p className="text-gray-600">
                {(content as TextContent).body}
              </p>
            </>
          )}

          {block.type === "list" && (
            <>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {(content as ListContent).title}
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {(content as ListContent).items?.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </>
          )}

          {block.type === "links" && (
            <>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {(content as LinksContent).title}
              </h3>
              <ul className="text-blue-600 space-y-1">
                {(content as LinksContent).links?.map((l, idx) => (
                  <li key={idx}>
                    <a href={l.url} className="hover:underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <>
          {block.type === "text" && (
            <>
              <input
                type="text"
                value={(content as TextContent).title || ""}
                onChange={(e) =>
                  setContent({ ...(content as TextContent), title: e.target.value })
                }
                className="w-full mb-3 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
              <textarea
                value={(content as TextContent).body || ""}
                onChange={(e) =>
                  setContent({ ...(content as TextContent), body: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 text-gray-800"
              />
            </>
          )}

          {block.type === "list" && (
            <>
              <input
                type="text"
                value={(content as ListContent).title || ""}
                onChange={(e) =>
                  setContent({ ...(content as ListContent), title: e.target.value })
                }
                className="w-full mb-3 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
              <textarea
                value={(content as ListContent).items?.join("\n") || ""}
                onChange={(e) =>
                  setContent({
                    ...(content as ListContent),
                    items: e.target.value.split("\n"),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 text-gray-800"
              />
            </>
          )}

          {block.type === "links" && (
            <>
              <input
                type="text"
                value={(content as LinksContent).title || ""}
                onChange={(e) =>
                  setContent({ ...(content as LinksContent), title: e.target.value })
                }
                className="w-full mb-3 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
              <textarea
                value={
                  (content as LinksContent).links
                    ?.map((l) => `${l.label}|${l.url}`)
                    .join("\n") || ""
                }
                onChange={(e) =>
                  setContent({
                    ...(content as LinksContent),
                    links: e.target.value.split("\n").map((line) => {
                      const [label, url] = line.split("|");
                      return { label, url };
                    }),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 text-gray-800"
              />
            </>
          )}

          <div className="flex justify-end mt-3 space-x-2">
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              <X size={14} />
            </button>
            <button
              onClick={save}
              className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              <Check size={14} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditableCard;
