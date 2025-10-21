import { Card, CardContent } from "../ui/Card";
import { Label } from "../ui/Label";
import { Select, SelectItem, SelectContent } from "../ui/Select";

interface ProfileSettingsProps {
  interfaceLang: string;
  profileVisibility: "public" | "private";
  onChange?: (
    field: "interfaceLang" | "profileVisibility",
    value: string
  ) => void;
  disabled?: boolean; // додатково, щоб заблокувати для не-власника
}

export default function ProfileSettings({
  interfaceLang,
  profileVisibility,
  onChange,
  disabled = false,
}: ProfileSettingsProps) {
  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Налаштування</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Мова інтерфейсу */}
          <div className="space-y-2">
            <Label htmlFor="language">Мова інтерфейсу</Label>
            <Select
              id="language"
              value={interfaceLang}
              disabled={disabled}
              onChange={(e) =>
                onChange?.("interfaceLang", e.target.value)
              }
            >
              <SelectContent>
                <SelectItem value="uk">Українська</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pl">Polski</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Приватність */}
          <div className="space-y-2">
            <Label htmlFor="visibility">Видимість профілю</Label>
            <Select
              id="visibility"
              value={profileVisibility}
              disabled={disabled}
              onChange={(e) =>
                onChange?.("profileVisibility", e.target.value)
              }
            >
              <SelectContent>
                <SelectItem value="public">Публічний</SelectItem>
                <SelectItem value="private">Приватний</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-muted-foreground text-sm">
          Інші опції зʼявляться тут згодом, наприклад — темна тема, email-сповіщення тощо.
        </div>
      </CardContent>
    </Card>
  );
}
