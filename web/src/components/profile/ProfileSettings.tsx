import { Card, CardContent } from "../ui/Card";
import { Label } from "../ui/Label";
import { Select, SelectItem, SelectContent } from "../ui/Select";
import { useTranslation } from "../useTranslations";

interface ProfileSettingsProps {
  interfaceLang: string;
  profileVisibility: "public" | "private";
  onChange?: (
    field: "interfaceLang" | "profileVisibility",
    value: string
  ) => void;
  disabled?: boolean;
}

export default function ProfileSettings({
  interfaceLang,
  profileVisibility,
  onChange,
  disabled = false,
}: ProfileSettingsProps) {
  const { t } = useTranslation();
  const tp = t("profileSettings");

  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">{tp("title")}</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="language">{tp("interfaceLang")}</Label>
            <Select
              id="language"
              value={interfaceLang}
              disabled={disabled}
              onChange={(e) => onChange?.("interfaceLang", e.target.value)}
            >
              <SelectContent>
                <SelectItem value="uk">Українська</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pl">Polski</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visibility">{tp("visibility")}</Label>
            <Select
              id="visibility"
              value={profileVisibility}
              disabled={disabled}
              onChange={(e) => onChange?.("profileVisibility", e.target.value)}
            >
              <SelectContent>
                <SelectItem value="public">{tp("public")}</SelectItem>
                <SelectItem value="private">{tp("private")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-muted-foreground text-sm">{tp("comingSoon")}</div>
      </CardContent>
    </Card>
  );
}
