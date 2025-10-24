import { CalendarDays, Clock } from "lucide-react";
import { useTranslation } from "../useTranslations";

type ProfileActivityProps = {
  createdAt: string;
  lastActiveAt: string;
};

export default function ProfileActivity({
  createdAt,
  lastActiveAt,
}: ProfileActivityProps) {
  const { t, lang } = useTranslation();
  const tp = t("profileActivity");

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString(
      lang === "uk" ? "uk-UA" : lang === "pl" ? "pl-PL" : "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {tp("title")}
      </h3>

      <div className="flex items-center gap-3 mb-2">
        <CalendarDays className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700">
          {tp("registered")}&nbsp;
          <strong>{formatDate(createdAt)}</strong>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700">
          {tp("lastActive")}&nbsp;
          <strong>{formatDate(lastActiveAt)}</strong>
        </span>
      </div>
    </div>
  );
}
