import uk from "./uk";
import en from "./en";
import pl from "./pl";

export const translations = { uk, en, pl };

export type LangKey = keyof typeof translations;
