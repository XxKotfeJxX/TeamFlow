import React from "react";

interface TagFilterProps {
  tags: string[];
  activeTags: string[];
  onToggleTag: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, activeTags, onToggleTag }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onToggleTag(tag)}
          className={`px-3 py-1 rounded-xl border ${
            activeTags.includes(tag)
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
