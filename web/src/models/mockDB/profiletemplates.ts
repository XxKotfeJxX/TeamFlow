// web/src/models/mockDB/profileTemplates.ts

/**
 * Тип для визначення, які поля містить шаблон
 */
export interface ProfileTemplateField {
  key: string; // унікальний ключ у data
  label: string; // підпис поля
  type: "text" | "textarea" | "image" | "list" | "linkList"; // тип введення
  required?: boolean;
}

/**
 * Шаблон профільного блоку (візитки)
 */
export interface ProfileTemplate {
  id: string; // UUID або унікальний ключ
  name: string; // системна назва (наприклад, "text_basic", "gallery")
  displayName: string; // як показувати в UI ("Текстовий блок", "Галерея")
  description?: string; // короткий опис
  icon?: string; // опціонально — іконка для UI
  fields: ProfileTemplateField[]; // поля, які редагуються
  styles?: Record<string, unknown>; // стилі для рендеру блоку
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Мокові шаблони для візитки команди
 */
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

/**
 * In-memory “БД” для шаблонів
 */
export const profileTemplateDb = {
  getAll: (): ProfileTemplate[] => [...profileTemplates],
  getById: (id: string): ProfileTemplate | undefined =>
    profileTemplates.find((t) => t.id === id),
};
