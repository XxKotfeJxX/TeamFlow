import React, { useState, useEffect } from "react";
import EditableCard from "./EditableCard";
import AddCardButton from "./AddCardButton";
import {
  teamProfileDb,
  type TeamProfileBlock,
  type TeamProfileBlockType,
} from "../../models/mockDB/teams";

interface TabOverviewProps {
  teamId: string;
}

const TabOverview: React.FC<TabOverviewProps> = ({ teamId }) => {
  const [blocks, setBlocks] = useState<TeamProfileBlock[]>([]);

  // === 1. Завантажуємо дані при монтуванні ===
  useEffect(() => {
    const fetchedBlocks = teamProfileDb.getByTeamId(teamId);
    setBlocks(fetchedBlocks);
  }, [teamId]);

  // === 2. Оновлення / збереження змін ===
  const handleSave = async (updated: TeamProfileBlock) => {
    teamProfileDb.update(updated.id, updated);
    const refreshed = teamProfileDb.getByTeamId(teamId);
    setBlocks(refreshed);
  };

  // === 3. Додавання нового блоку ===
  const handleAdd = async (type: TeamProfileBlockType) => {
    const newBlock = teamProfileDb.create(teamId, type, {}, blocks.length);
    const refreshed = teamProfileDb.getByTeamId(teamId);
    setBlocks(refreshed);
  };

  // === 4. Видалення блоку (опціонально, можна додати потім) ===
  // const handleDelete = async (id: string) => {
  //   teamProfileDb.delete(id);
  //   setBlocks(teamProfileDb.getByTeamId(teamId));
  // };

  return (
    <div className="space-y-6">
      {blocks.map(block => (
        <EditableCard
          key={block.id}
          block={block}
          onSave={handleSave}
          // onDelete={handleDelete} // можеш додати пізніше
        />
      ))}

      <AddCardButton onAdd={handleAdd} />
    </div>
  );
};

export default TabOverview;
