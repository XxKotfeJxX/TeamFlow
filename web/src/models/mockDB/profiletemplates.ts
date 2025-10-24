export interface ProfileTemplateField {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "list" | "linkList";
  required?: boolean;
}

export interface ProfileTemplate {
  id: string;
  name: string;
  displayName: string;
  description?: string;
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
    displayName: "Текстовий блок",
    description: "Заголовок і короткий текстовий опис",
    icon: "📝",
    fields: [
      { key: "title", label: "Заголовок", type: "text", required: true },
      { key: "body", label: "Текст", type: "textarea" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tpl-list",
    name: "list",
    displayName: "Список",
    description: "Заголовок і список пунктів",
    icon: "📋",
    fields: [
      { key: "title", label: "Заголовок", type: "text", required: true },
      { key: "items", label: "Пункти списку", type: "list" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tpl-links",
    name: "links",
    displayName: "Посилання",
    description: "Заголовок і набір зовнішніх посилань",
    icon: "🔗",
    fields: [
      { key: "title", label: "Заголовок", type: "text", required: true },
      { key: "links", label: "Посилання", type: "linkList" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tpl-gallery",
    name: "gallery",
    displayName: "Галерея зображень",
    description: "Заголовок і декілька фото",
    icon: "🖼️",
    fields: [
      { key: "title", label: "Заголовок", type: "text", required: true },
      { key: "images", label: "Фото", type: "image" },
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
