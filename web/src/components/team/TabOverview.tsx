import React, { useState, useEffect } from "react";
import EditableCard from "./EditableCard";
import AddCardButton from "./AddCardButton";
import {
  teamProfileDb,
  type TeamProfileBlock,
} from "../../models/mockDB/teams";
import { profileTemplateDb } from "../../models/mockDB/profiletemplates";

interface TabOverviewProps {
  teamId: string;
}

const TabOverview: React.FC<TabOverviewProps> = ({ teamId }) => {
  const [blocks, setBlocks] = useState<TeamProfileBlock[]>([]);

  useEffect(() => {
    setBlocks(teamProfileDb.getByTeamId(teamId));
  }, [teamId]);

  const handleSave = (updated: TeamProfileBlock) => {
    teamProfileDb.update(updated.id, updated);
    setBlocks([...teamProfileDb.getByTeamId(teamId)]);
  };

  const handleAdd = async (templateId: string) => {
    teamProfileDb.create(teamId, templateId, {}, blocks.length);
    const refreshed = teamProfileDb.getByTeamId(teamId);
    setBlocks(refreshed);
  };

  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        const template = profileTemplateDb.getById(block.templateId);
        if (!template) return null;
        return (
          <EditableCard
            key={block.id}
            block={block}
            template={template}
            onSave={handleSave}
          />
        );
      })}

      <AddCardButton onAdd={handleAdd} />
    </div>
  );
};

export default TabOverview;
