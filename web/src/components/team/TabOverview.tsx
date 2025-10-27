import React, { useState, useEffect } from "react";
import EditableCard from "./EditableCard";
import AddCardButton from "./AddCardButton";
import {
  teamProfileDb,
  type TeamProfileBlock,
} from "../../models/mockDB/teams";
import { profileTemplateDb } from "../../models/mockDB/profiletemplates";
import { useTranslation } from "../useTranslations";

interface TabOverviewProps {
  teamId: string;
  canEdit?: boolean;
}

const TabOverview: React.FC<TabOverviewProps> = ({
  teamId,
  canEdit = false,
}) => {
  const [blocks, setBlocks] = useState<TeamProfileBlock[]>([]);
  const { t } = useTranslation();
  const to = t("tabOverview");

  useEffect(() => {
    setBlocks([...teamProfileDb.getByTeamId(teamId)]);
  }, [teamId]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "teamProfilesDB") {
        setBlocks([...teamProfileDb.getByTeamId(teamId)]);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [teamId]);

  const handleSave = (updated: TeamProfileBlock) => {
    if (!canEdit) return;
    teamProfileDb.update(updated.id, updated);
    setBlocks([...teamProfileDb.getByTeamId(teamId)]);
  };

  const handleAdd = (templateId: string) => {
    if (!canEdit) return;
    teamProfileDb.create(teamId, templateId, {}, blocks.length);
    setBlocks([...teamProfileDb.getByTeamId(teamId)]);
  };

  const handleDelete = (blockId: string) => {
    if (!canEdit) return;
    teamProfileDb.delete(blockId);
    setBlocks([...teamProfileDb.getByTeamId(teamId)]);
  };

  return (
    <div className="space-y-6">
      {blocks.length === 0 && (
        <p className="text-gray-500 text-center mt-6">
          {to("noBlocks")} {canEdit ? to("addFirst") : ""}
        </p>
      )}

      {blocks.map((block) => {
        const template = profileTemplateDb.getById(block.templateId);
        if (!template) return null;
        return (
          <EditableCard
            key={block.id}
            block={block}
            template={template}
            onSave={handleSave}
            onDelete={() => handleDelete(block.id)}
            canEdit={canEdit}
          />
        );
      })}

      {canEdit && <AddCardButton onAdd={handleAdd} />}
    </div>
  );
};

export default TabOverview;
