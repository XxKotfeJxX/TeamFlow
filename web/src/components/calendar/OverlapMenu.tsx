// src/components/calendar/OverlapMenu.tsx
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import type { Event, Task } from "../../models/mockDB/calendar";

interface OverlapMenuProps {
  items: (Event | Task)[];
  onSelect: (item: Event | Task) => void;
  onClose: () => void;
  position: { x: number; y: number }; // координати viewport
  selectedItem?: Event | Task | null;
}

const OverlapMenu: React.FC<OverlapMenuProps> = ({
  items,
  onSelect,
  onClose,
  position,
  selectedItem,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return ReactDOM.createPortal(
  <>
    {/* бекдроп, який ловить всі кліки */}
    <div
      className="fixed inset-0 z-[9998]"
      onClick={onClose}
    />

    <div
      ref={menuRef}
      className="fixed bg-white border border-gray-300 rounded shadow-lg z-[9999] w-56"
      style={{
        top: position.y,
        left: position.x,
      }}
      onClick={(e) => e.stopPropagation()} // щоб кліки всередині меню не закривали його
    >
      <ul className="max-h-60 overflow-auto">
        {items.map((item) => {
          const isActive = selectedItem?.id === item.id;
          return (
            <li
              key={item.id}
              className={`px-3 py-2 cursor-pointer flex items-center text-black truncate ${
                isActive ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
              }`}
              onClick={() => onSelect(item)}
            >
              <div
                className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                style={{ backgroundColor: item.color || "#94a3b8" }}
              />
              <span className="truncate">{item.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  </>,
  document.body
);
};

export default OverlapMenu;
