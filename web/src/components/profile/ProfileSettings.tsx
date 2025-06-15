import { Card, CardContent } from '../ui/Card'
import { Label } from '../ui/Label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/Select'

export default function ProfileSettings() {
  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Налаштування</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Мова інтерфейсу */}
          <div className="space-y-2">
            <Label htmlFor="language">Мова інтерфейсу</Label>
            <Select defaultValue="uk">
              <SelectTrigger id="language">
                <SelectValue placeholder="Оберіть мову" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uk">Українська</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pl">Polski</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Приватність (мок) */}
          <div className="space-y-2">
            <Label htmlFor="visibility">Видимість профілю</Label>
            <Select defaultValue="public">
              <SelectTrigger id="visibility">
                <SelectValue placeholder="Оберіть рівень приватності" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Публічний</SelectItem>
                <SelectItem value="private">Приватний</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Placeholder для майбутніх опцій */}
        <div className="text-muted-foreground text-sm">
          Інші опції зʼявляться тут згодом, наприклад — темна тема, email-сповіщення тощо.
        </div>
      </CardContent>
    </Card>
  )
}