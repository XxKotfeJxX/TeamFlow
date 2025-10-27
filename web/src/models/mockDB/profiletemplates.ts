export interface ProfileTemplateField {
  key: string;
  labelKey: string; // 🔹 ключ перекладу замість тексту
  type: "text" | "textarea" | "image" | "list" | "linkList";
  required?: boolean;
}

export interface ProfileTemplate {
  id: string;
  name: string;
  displayNameKey: string; // 🔹 ключ перекладу назви
  descriptionKey?: string; // 🔹 ключ перекладу опису
  icon?: string;
  fields: ProfileTemplateField[];
  styles?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export const profileTemplates: ProfileTemplate[] = [
  {
    id: "tpl-text-basic",
    name: "text_basic",
    displayNameKey: "textBasicName",
    descriptionKey: "textBasicDesc",
    icon: "📝",
    fields: [
      { key: "title", labelKey: "titleLabel", type: "text", required: true },
      { key: "body", labelKey: "bodyLabel", type: "textarea" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tpl-list",
    name: "list",
    displayNameKey: "listName",
    descriptionKey: "listDesc",
    icon: "📋",
    fields: [
      { key: "title", labelKey: "titleLabel", type: "text", required: true },
      { key: "items", labelKey: "itemsLabel", type: "list" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tpl-links",
    name: "links",
    displayNameKey: "linksName",
    descriptionKey: "linksDesc",
    icon: "🔗",
    fields: [
      { key: "title", labelKey: "titleLabel", type: "text", required: true },
      { key: "links", labelKey: "linksLabel", type: "linkList" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tpl-gallery",
    name: "gallery",
    displayNameKey: "galleryName",
    descriptionKey: "galleryDesc",
    icon: "🖼️",
    fields: [
      { key: "title", labelKey: "titleLabel", type: "text", required: true },
      { key: "images", labelKey: "imagesLabel", type: "image" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const profileTemplateDb = {
  getAll: (): ProfileTemplate[] => [...profileTemplates],
  getById: (id: string): ProfileTemplate | undefined =>
    profileTemplates.find((t) => t.id === id),
};
