import { Clock, Calendar } from "lucide-react";
import React, { useState } from "react";

function CustomTimePicker({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  const [manual, setManual] = useState(value || (() => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}));

  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  const [mode, setMode] = useState<"hour" | "minute">("hour");

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value.replace(/[^0-9:]/g, "");
  setManual(val);
};

  const fixTime = (input: string) => {
  let [h, m] = input.split(":");
  h = h || "00";
  m = m || "00";

  let hourNum = parseInt(h, 10);
  let minuteNum = parseInt(m, 10);

  if (isNaN(hourNum)) hourNum = 0;
  if (isNaN(minuteNum)) minuteNum = 0;

  if (hourNum > 23) hourNum = 23;
  if (minuteNum > 59) minuteNum = 59;

  return `${hourNum.toString().padStart(2, "0")}:${minuteNum.toString().padStart(2, "0")}`;
};

  const getHourCoords = (hour: number) => {
  // зовнішнє коло 0-11
  if (hour <= 11) {
    const angle = (hour * 30 * Math.PI) / 180;
    return {
      x: 90 + 70 * Math.sin(angle),
      y: 90 - 70 * Math.cos(angle),
    };
  } else {
    const angle = ((hour - 12) * 30 * Math.PI) / 180;
    return {
      x: 90 + 45 * Math.sin(angle),
      y: 90 - 45 * Math.cos(angle),
    };
  }
};

  const getMinuteCoords = (minute: number) => {
  const angle = (minute * 6 * Math.PI) / 180; // 6° на хвилину
  return {
    x: 90 + 70 * Math.sin(angle),
    y: 90 - 70 * Math.cos(angle),
  };
  };
  
const isOverlappingCircle = (
  digitX: number,
  digitY: number,
  mode: "hour" | "minute"
) => {
  let circleX: number, circleY: number;

  if (mode === "hour") {
    if (selectedHour === null) return false;
    ({ x: circleX, y: circleY } = getHourCoords(selectedHour));
  } else {
    if (selectedMinute === null) return false;
    ({ x: circleX, y: circleY } = getMinuteCoords(selectedMinute));
  }

  const circleRadius = 16; // радіус кружечка (w-8 h-8)
  const digitRadius = 6;   // приблизний радіус цифри
  const dx = digitX - circleX;
  const dy = digitY - circleY;

  return Math.sqrt(dx * dx + dy * dy) < circleRadius + digitRadius;
};




  const handleBlur = () => {
  const formatted = fixTime(manual);
  setManual(formatted);
  onChange(formatted);
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    const formatted = fixTime(manual);
    setManual(formatted);
    onChange(formatted);
  }
};


  const handleConfirm = () => {
    if (selectedHour !== null && selectedMinute !== null) {
      const formatted = `${selectedHour.toString().padStart(2, "0")}:${selectedMinute
        .toString()
        .padStart(2, "0")}`;
      onChange(formatted);
      setManual(formatted);
    }
    setOpen(false);
  };

  return (
    <div className="relative flex items-center border rounded-lg bg-white min-w-[130px] px-2 py-1">
      {/* Поле для ручного вводу */}
      <input
  type="text"
  value={manual}
  onChange={handleManualChange}
  onBlur={handleBlur}
  onKeyDown={handleKeyDown}
  placeholder="HH:MM"
  className="flex-1 bg-transparent text-black focus:outline-none"
/>


      {/* Іконка годинника */}
      <Clock
        size={18}
        className="text-gray-500 cursor-pointer hover:text-gray-700 ml-2"
        onClick={() => setOpen(true)}
      />

      {/* Модалка вибору часу */}
      {open && (
  <div className="absolute z-50 top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4">
    {/* Кнопки зверху */}
    <div className="flex justify-center gap-2 mb-4">
      <button
  className={`px-3 py-1 rounded ${mode === "hour" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
  onClick={() => setMode("hour")}
>
  {selectedHour !== null ? selectedHour.toString().padStart(2, "0") : manual.split(":")[0] || "HH"}
</button>
<button
  className={`px-3 py-1 rounded ${mode === "minute" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
  onClick={() => setMode("minute")}
>
  {selectedMinute !== null ? selectedMinute.toString().padStart(2, "0") : manual.split(":")[1] || "MM"}
</button>

    </div>

    {/* Циферблат */}
    <div className="relative w-[180px] h-[180px] rounded-full mx-auto">
      {mode === "hour" &&
              <>
              
          {/* Зовнішнє коло 0-11 */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 90 + 70 * Math.sin(angle);
            const y = 90 - 70 * Math.cos(angle);
            const hour = i;
            
            
            return (
              <div
                key={`outer-${i}`}
                className={`absolute cursor-pointer z-10 text-sm ${
    isOverlappingCircle(x, y, "hour") ? "text-white font-bold" : "text-gray-700"
  }`}
                style={{ left: `${x-6}px`, top: `${y-6}px` }}
                onClick={() => setSelectedHour(hour)}
              >
                {hour.toString().padStart(2, "0")}
              </div>
            );
          })}
          {/* Внутрішнє коло 12-23 */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 90 + 45 * Math.sin(angle);
            const y = 90 - 45 * Math.cos(angle);
            const hour = i + 12;
            return (
              <div
                key={`inner-${i}`}
                className={`absolute cursor-pointer z-10 text-sm ${
    isOverlappingCircle(x, y, "hour") ? "text-white font-bold" : "text-gray-700"
  }`}
                style={{ left: `${x-6}px`, top: `${y-6}px` }}
                onClick={() => setSelectedHour(hour)}
              >
                {hour.toString().padStart(2, "0")}
              </div>
            );
          })}
              {selectedHour !== null && (() => {
  // Розміри       // w-3 h-3 → радіус 1.5px
  const circleSize = 32;           // w-8 h-8 → 32px
  const circleRadius = circleSize / 2;
  const center = 93.5;

                
  // Центр кружечка
  const rawCircle = getHourCoords(selectedHour);


                

  return (
    <>
      {/* Точка */}
<div
  className="absolute w-3 h-3 bg-blue-500 rounded-full"
  style={{
    left: `${90 - 1.5}px`, // центр циферблату - радіус точки
    top: `${90 - 1.5}px`,
  }}
/>

{/* Лінія від центру до кружечка */}
<div
  className="absolute bg-blue-500"
  style={{
    left: `${center}px`,
    top: `${center}px`,
    width: `${Math.hypot(
      rawCircle.x + circleRadius - center - 14,
      rawCircle.y + circleRadius - center - 14
    )}px`,
    height: "2px",
    transformOrigin: "0 50%",
    transform: `rotate(${Math.atan2(
      rawCircle.y + circleRadius - center - 14,
      rawCircle.x + circleRadius - center - 14
    )}rad)`,
  }}
/>


      {/* Кружечок */}
      <div
  className="absolute w-8 h-8 bg-blue-500 rounded-full"
  style={{
    left: `${rawCircle.x - 14}px`,
    top: `${rawCircle.y - 12}px`,
    zIndex: 0,
  }}
/>
    </>
  );
})()}


        </>
      }

      {mode === "minute" && (
  <div
    className="relative w-[180px] h-[180px] rounded-full flex items-center justify-center mx-auto cursor-pointer"
    onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const dx = clickX - centerX;
      const dy = clickY - centerY;

      // кут у градусах
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      angle = (angle + 90 + 360) % 360;

      // переводимо кут у хвилини
      const minutes = Math.round(angle / 6) % 60;
      setSelectedMinute(minutes);
    }}
  >
    {/* 5-хвилинні мітки */}
    {Array.from({ length: 12 }).map((_, i) => {
      const minute = i * 5;
      const angle = (i * 30 * Math.PI) / 180;
      const x = 90 + 70 * Math.sin(angle);
      const y = 90 - 70 * Math.cos(angle);
      return (
        <div
          key={minute}
          className={`absolute cursor-pointer z-10 text-sm ${
    isOverlappingCircle(x, y, "minute") ? "text-white font-bold" : "text-gray-700"
  }`}
          style={{ left: `${x-6}px`, top: `${y-6}px`, userSelect: "none" }}
        >
          {minute.toString().padStart(2, "0")}
        </div>
      );
    })}
                {selectedMinute !== null && (() => {
  // обчислюємо координати для кружечка
  const minuteCoords = getMinuteCoords(selectedMinute);

  return (
    <>
      {/* Центр */}
      <div
        className="absolute w-3 h-3 bg-blue-500 rounded-full"
        style={{ left: `calc(90px - 1.5px)`, top: `calc(90px - 1.5px)` }}
      />

      {/* Лінія від центру до вибраної хвилини */}
      <div
        className="absolute bg-blue-500"
        style={{
          left: "93.5px",
          top: "93.5px",
          width: `${Math.hypot(minuteCoords.x - 90 + 4, minuteCoords.y - 90 + 4)}px`,
          height: "2px",
          transformOrigin: "0 50%",
          transform: `rotate(${Math.atan2(minuteCoords.y - 90 + 2, minuteCoords.x - 90 - 2)}rad)`,
        }}
      />

      {/* Кружечок на вибраній хвилині */}
      <div
        className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
        style={{ left: `${minuteCoords.x - 14}px`, top: `${minuteCoords.y - 10}px` }}
      >
        <span className="text-white text-xs font-bold">
        </span>
      </div>
    </>
  );
})()}

  </div>
)}      

          </div>
          <div className="flex justify-center gap-2 mt-4">
  <button
    className="px-3 py-1 bg-gray-200 rounded"
    onClick={() => {
      setOpen(false);
      setSelectedHour(null);
      setSelectedMinute(null);
      setManual(value); // повернути попереднє значення
    }}
  >
    Скасувати
  </button>
  <button
    className="px-3 py-1 bg-blue-500 text-white rounded"
    onClick={handleConfirm}
  >
    ОК
  </button>
</div>
  </div>
)}

    </div>
  );
}



interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
  const [manual, setManual] = useState(value || "");
  const [open, setOpen] = useState(false);

  const isLeap = (year: number): boolean =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const getDaysInMonth = (month: number, year: number): number => {
    const days = [
      31,
      isLeap(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    return days[month - 1];
  };

  const normalizeYear = (input?: string): string => {
    const current = new Date().getFullYear();
    if (!input) return current.toString();

    if (input.length === 4) return input;

    // спроба знайти найближчий рік до поточного
    const possibilities = [];
    for (let i = 0; i <= 4 - input.length; i++) {
      const candidate = parseInt(
        current.toString().slice(0, i) + input + current.toString().slice(i + input.length)
      );
      possibilities.push(candidate);
    }
    let best = possibilities[0];
    let minDiff = Math.abs(best - current);
    for (const p of possibilities) {
      const diff = Math.abs(p - current);
      if (diff < minDiff) {
        best = p;
        minDiff = diff;
      }
    }
    return best.toString();
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  let val = e.target.value.replace(/[^\d.]/g, ""); // тільки цифри та крапки

  if (val.length > 2 && val[2] !== ".") {
    val = val.slice(0, 2) + "." + val.slice(2);
  }

  if (val.length > 5 && val[5] !== ".") {
    val = val.slice(0, 5) + "." + val.slice(5);
  }
  setManual(val);
};


  const autoFix = (): void => {
    if (!manual) {
      const now = new Date();
      const fixed = `${String(now.getDate()).padStart(2, "0")}.${String(
        now.getMonth() + 1
      ).padStart(2, "0")}.${now.getFullYear()}`;
      setManual(fixed);
      onChange?.(fixed);
      return;
    }

    const parts = manual.split(".");
    let [d, m, y] = parts;

    // День
    if (!d) d = "01";
    if (d.length === 1) d = "0" + d;

    // Місяць
    if (!m) m = "01";
    if (m.length === 1) m = "0" + m;
    m = Math.min(12, Math.max(1, +m)).toString().padStart(2, "0");

    // Рік
    y = normalizeYear(y);

    // Перевірка кількості днів у місяці
    const days = getDaysInMonth(+m, +y);
    d = Math.min(+d, days).toString().padStart(2, "0");

    setManual(`${d}.${m}.${y}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBlur = (_e: React.FocusEvent<HTMLInputElement>): void => autoFix();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") autoFix();
  };

  return (
    <div className="relative flex items-center border rounded-md px-2 py-1 bg-white">
      {/* Поле вводу */}
      <input
        type="text"
        value={manual}
        onChange={handleManualChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="DD.MM.YYYY"
        className="flex-1 bg-transparent text-black focus:outline-none"
      />

      {/* Іконка календаря */}
      <Calendar
        size={18}
        className="text-gray-500 cursor-pointer hover:text-gray-700 ml-2"
        onClick={() => setOpen(true)}
      />

      {/* Модалка календаря (тимчасово пуста) */}
      {open && (
        <div className="absolute z-50 top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4">
          <p className="text-gray-500 text-sm">Тут буде календар </p>
        </div>
      )}
    </div>
  );
}
export { CustomTimePicker, CustomDatePicker };
