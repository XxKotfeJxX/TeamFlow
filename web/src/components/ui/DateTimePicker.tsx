import { Clock, Calendar } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

function CustomTimePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [manual, setManual] = useState(
    value ||
      (() => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
      })
  );

  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  const [mode, setMode] = useState<"hour" | "minute">("hour");

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTyping && value !== manual) {
      setManual(value);
      const [h, m] = value.split(":").map(Number);
      setSelectedHour(h);
      setSelectedMinute(m);
    }
  }, [value, isTyping, manual]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9:]/g, "");
    setManual(val);
    setIsTyping(true);
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

    return `${hourNum.toString().padStart(2, "0")}:${minuteNum
      .toString()
      .padStart(2, "0")}`;
  };

  const updateTime = (h: number | null, m: number | null) => {
    const hour = h !== null ? h : selectedHour ?? 0;
    const minute = m !== null ? m : selectedMinute ?? 0;
    const formatted = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    setManual(formatted);
    onChange(formatted);
  };

  const handlePointerDown = (e: React.MouseEvent) => {
    setDragging(true);
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = e.clientX - rect.left - centerX;
    const dy = e.clientY - rect.top - centerY;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;

    if (mode === "hour") {
      const distance = Math.sqrt(dx * dx + dy * dy);
      const isInner = distance < 60;
      const hour = Math.round(angle / 30) % 12;
      const hour12 = isInner ? hour + 12 : hour;
      setSelectedHour(hour12);
      updateTime(hour12, null);
    } else {
      const minute = Math.round(angle / 6) % 60;
      setSelectedMinute(minute);
      updateTime(null, minute);
    }
  };

  const handlePointerUp = () => setDragging(false);

  const getHourCoords = (hour: number) => {
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
    const angle = (minute * 6 * Math.PI) / 180;
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

    const circleRadius = 16;
    const digitRadius = 6;
    const dx = digitX - circleX;
    const dy = digitY - circleY;

    return Math.sqrt(dx * dx + dy * dy) < circleRadius + digitRadius;
  };

  const handleBlur = () => {
    const formatted = fixTime(manual);
    setManual(formatted);
    setSelectedHour(Number(formatted.split(":")[0]));
    setSelectedMinute(Number(formatted.split(":")[1]));
    onChange(formatted);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const formatted = fixTime(manual);
      setManual(formatted);
      setSelectedHour(Number(formatted.split(":")[0]));
      setSelectedMinute(Number(formatted.split(":")[1]));
      onChange(formatted);
      setIsTyping(false);
    }
  };

  return (
    <div className="relative flex items-center border rounded-lg bg-white min-w-[130px] px-2 py-1">
      <input
        type="text"
        value={manual}
        onChange={handleManualChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="HH:MM"
        className="flex-1 bg-transparent text-black focus:outline-none"
      />
      <Clock
        size={18}
        className="text-gray-500 cursor-pointer hover:text-gray-700 ml-2"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          ref={modalRef}
          className="absolute z-50 top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4"
        >
          <div className="flex justify-center gap-2 mb-4">
            <button
              className={`px-3 py-1 rounded ${
                mode === "hour" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("hour")}
            >
              {selectedHour !== null
                ? selectedHour.toString().padStart(2, "0")
                : manual.split(":")[0] || "HH"}
            </button>
            <button
              className={`px-3 py-1 rounded ${
                mode === "minute" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("minute")}
            >
              {selectedMinute !== null
                ? selectedMinute.toString().padStart(2, "0")
                : manual.split(":")[1] || "MM"}
            </button>
          </div>

          <div
            className="relative w-[180px] h-[180px] rounded-full mx-auto"
            style={{ userSelect: "none" }}
            onMouseDown={(e) => {
              e.preventDefault();
              handlePointerDown(e);
            }}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
          >
            {mode === "hour" && (
              <>
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x = 90 + 70 * Math.sin(angle);
                  const y = 90 - 70 * Math.cos(angle);
                  const hour = i;

                  return (
                    <div
                      key={`outer-${i}`}
                      className={`absolute cursor-pointer z-10 text-sm ${
                        isOverlappingCircle(x, y, "hour")
                          ? "text-white font-bold"
                          : "text-gray-700"
                      }`}
                      style={{ left: `${x - 6}px`, top: `${y - 6}px` }}
                      onClick={() => {
                        setSelectedHour(hour);
                        updateTime(hour, null);
                      }}
                    >
                      {hour.toString().padStart(2, "0")}
                    </div>
                  );
                })}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x = 90 + 45 * Math.sin(angle);
                  const y = 90 - 45 * Math.cos(angle);
                  const hour = i + 12;
                  return (
                    <div
                      key={`inner-${i}`}
                      className={`absolute cursor-pointer z-10 text-sm ${
                        isOverlappingCircle(x, y, "hour")
                          ? "text-white font-bold"
                          : "text-gray-700"
                      }`}
                      style={{ left: `${x - 6}px`, top: `${y - 6}px` }}
                      onClick={() => {
                        setSelectedHour(hour);
                        updateTime(hour, null);
                      }}
                    >
                      {hour.toString().padStart(2, "0")}
                    </div>
                  );
                })}
                {selectedHour !== null &&
                  (() => {
                    const circleSize = 32;
                    const circleRadius = circleSize / 2;
                    const center = 93.5;

                    const rawCircle = getHourCoords(selectedHour);

                    return (
                      <>
                        <div
                          className="absolute w-3 h-3 bg-blue-500 rounded-full"
                          style={{
                            left: `${90 - 1.5}px`,
                            top: `${90 - 1.5}px`,
                          }}
                        />

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
            )}

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

                  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
                  angle = (angle + 90 + 360) % 360;

                  const minutes = Math.round(angle / 6) % 60;
                  setSelectedMinute(minutes);
                  updateTime(null, minutes);
                }}
              >
                {Array.from({ length: 12 }).map((_, i) => {
                  const minute = i * 5;
                  const angle = (i * 30 * Math.PI) / 180;
                  const x = 90 + 70 * Math.sin(angle);
                  const y = 90 - 70 * Math.cos(angle);
                  return (
                    <div
                      key={minute}
                      className={`absolute cursor-pointer z-10 text-sm ${
                        isOverlappingCircle(x, y, "minute")
                          ? "text-white font-bold"
                          : "text-gray-700"
                      }`}
                      style={{
                        left: `${x - 6}px`,
                        top: `${y - 6}px`,
                        userSelect: "none",
                      }}
                    >
                      {minute.toString().padStart(2, "0")}
                    </div>
                  );
                })}
                {selectedMinute !== null &&
                  (() => {
                    const minuteCoords = getMinuteCoords(selectedMinute);

                    return (
                      <>
                        <div
                          className="absolute w-3 h-3 bg-blue-500 rounded-full"
                          style={{
                            left: `calc(90px - 1.5px)`,
                            top: `calc(90px - 1.5px)`,
                          }}
                        />

                        <div
                          className="absolute bg-blue-500"
                          style={{
                            left: "93.5px",
                            top: "93.5px",
                            width: `${Math.hypot(
                              minuteCoords.x - 90 + 4,
                              minuteCoords.y - 90 + 4
                            )}px`,
                            height: "2px",
                            transformOrigin: "0 50%",
                            transform: `rotate(${Math.atan2(
                              minuteCoords.y - 90 + 2,
                              minuteCoords.x - 90 - 2
                            )}rad)`,
                          }}
                        />

                        <div
                          className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                          style={{
                            left: `${minuteCoords.x - 14}px`,
                            top: `${minuteCoords.y - 10}px`,
                          }}
                        >
                          <span className="text-white text-xs font-bold"></span>
                        </div>
                      </>
                    );
                  })()}
              </div>
            )}
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
  const [externalValue, setExternalValue] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"day" | "month" | "year">("day");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== externalValue) {
      setExternalValue(value);
      setManual(value);
    }
  }, [value, externalValue]);

  const today = new Date();
  const initialDate = manual
    ? new Date(manual.split(".").reverse().join("-"))
    : today;

  const [selectedDay, setSelectedDay] = useState(initialDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(
    initialDate.getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());

  const minYear = today.getFullYear();
  const maxYear = minYear + 100;

  const [yearOffset, setYearOffset] = useState(0); // для слайдера років

  const isLeap = (year: number) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getDaysInMonth = (month: number, year: number) => {
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

  const handleManualDate = () => {
    const today = new Date();
    const val = manual.replace(/[^\d]/g, "");

    let day = "01";
    if (val.length >= 2) {
      day = val.slice(0, 2);
      if (Number(day) < 1) day = "01";
      if (Number(day) > 31) day = "31";
    }

    let month = "01";
    if (val.length >= 4) {
      month = val.slice(2, 4);
      if (Number(month) < 1) month = "01";
      if (Number(month) > 12) month = "12";
    }

    const yearInput = val.slice(4);
    let year = String(today.getFullYear());

    if (yearInput.length > 0) {
      const getClosestYear = (input: string, currentYear: number): number => {
        if (input.length > 4) return currentYear;

        if (input.length === 4) {
          const num = Number(input);
          return num === 0 || num > 3999 ? currentYear : num;
        }

        const block = input;
        const free = 4 - block.length;
        const patterns: string[] = [];

        for (let i = 0; i <= free; i++) {
          patterns.push("x".repeat(i) + block + "x".repeat(free - i));
        }

        const candidates: number[] = [];

        for (const pattern of patterns) {
          const count = (pattern.match(/x/g) || []).length;
          const max = 10 ** count;

          for (let n = 0; n < max; n++) {
            const digits = n.toString().padStart(count, "0").split("");
            let str = pattern;
            for (const d of digits) str = str.replace("x", d);
            const yearNum = Number(str);
            if (yearNum > 0 && yearNum <= 3999) candidates.push(yearNum);
          }
        }

        if (candidates.length === 0) return currentYear;

        return candidates.reduce((a, b) =>
          Math.abs(a - currentYear) < Math.abs(b - currentYear) ? a : b
        );
      };

      year = String(getClosestYear(yearInput, today.getFullYear()));
    }

    const newVal = `${String(day).padStart(2, "0")}.${String(month).padStart(
      2,
      "0"
    )}.${year}`;
    setManual(newVal);
    onChange(newVal);

    const formatted = `${day.padStart(2, "0")}.${month.padStart(
      2,
      "0"
    )}.${year}`;
    setManual(formatted);
    setSelectedDay(Number(day));
    setSelectedMonth(Number(month));
    setSelectedYear(Number(year));
    onChange?.(formatted);
  };

  const updateManual = (
    d = selectedDay,
    m = selectedMonth,
    y = selectedYear
  ) => {
    const day = String(d).padStart(2, "0");
    const month = String(m).padStart(2, "0");
    const year = String(y);
    const newVal = `${day}.${month}.${year}`;
    setManual(newVal);
    onChange?.(newVal);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    updateManual(day);
  };

  const handleMonthClick = (month: number) => {
    setSelectedMonth(month);
    const daysInMonth = getDaysInMonth(month, selectedYear);
    if (selectedDay > daysInMonth) setSelectedDay(daysInMonth);
    updateManual(undefined, month);
  };

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    const daysInMonth = getDaysInMonth(selectedMonth, year);
    if (selectedDay > daysInMonth) setSelectedDay(daysInMonth);
    updateManual(undefined, undefined, year);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    const blanks = Array((firstDay + 6) % 7).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return [...blanks, ...days].map((d, idx) =>
      d ? (
        <button
          key={idx}
          className={`w-8 h-8 text-center rounded ${
            d === selectedDay
              ? "bg-blue-500 text-white"
              : "border border-gray-300 text-black"
          }`}
          onClick={() => handleDayClick(d)}
        >
          {d}
        </button>
      ) : (
        <div key={idx} className="w-8 h-8" />
      )
    );
  };

  const renderMonths = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    return months.map((m) => (
      <button
        key={m}
        className={`w-16 h-10 rounded border border-gray-300 text-black ${
          m === selectedMonth ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => handleMonthClick(m)}
      >
        {new Date(0, m - 1).toLocaleString("uk-UA", { month: "short" })}
      </button>
    ));
  };

  const renderYears = () => {
    const years = Array.from(
      { length: 12 },
      (_, i) => minYear + yearOffset + i
    ).filter((y) => y <= maxYear);
    return years.map((y) => (
      <button
        key={y}
        className={`w-16 h-10 rounded border border-gray-300 text-black ${
          y === selectedYear ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => handleYearClick(y)}
      >
        {y}
      </button>
    ));
  };

  const nextYears = () => {
    if (minYear + yearOffset + 12 <= maxYear) setYearOffset(yearOffset + 12);
  };
  const prevYears = () => {
    if (yearOffset - 12 >= 0) setYearOffset(yearOffset - 12);
  };

  return (
    <div className="relative flex items-center border rounded-md px-2 py-1 bg-white mb-2">
      <input
        type="text"
        value={manual}
        onChange={(e) => {
          let v = e.target.value.replace(/[^\d.]/g, "");

          const dots = [...v.matchAll(/\./g)].map((m) => m.index!);

          if (dots.length > 2) {
            const thirdDot = dots[2];
            v = v.slice(0, thirdDot);
          }

          if (!v.includes(".") && v.length > 2) {
            v = v.slice(0, 2) + "." + v.slice(2);
          }

          const firstDotIndex = v.indexOf(".");
          if (firstDotIndex !== -1) {
            const afterFirst = v.slice(firstDotIndex + 1);
            if (afterFirst.length > 2 && !afterFirst.includes(".")) {
              const insertPos = firstDotIndex + 3;
              v = v.slice(0, insertPos) + "." + v.slice(insertPos);
            }
          }

          setManual(v);
        }}
        onBlur={handleManualDate}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleManualDate();
        }}
        className="flex-1 bg-transparent text-black focus:outline-none"
        placeholder="DD.MM.YYYY"
      />

      <Calendar
        size={18}
        className="text-gray-500 cursor-pointer hover:text-gray-700 ml-2"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          ref={modalRef}
          className="absolute z-50 top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4"
        >
          <div className="flex gap-2 mb-4">
            <button
              className={`px-3 py-1 rounded ${
                mode === "day" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("day")}
            >
              День ({selectedDay})
            </button>
            <button
              className={`px-3 py-1 rounded ${
                mode === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("month")}
            >
              Місяць ({selectedMonth})
            </button>
            <button
              className={`px-3 py-1 rounded ${
                mode === "year" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setMode("year")}
            >
              Рік ({selectedYear})
            </button>
          </div>

          {mode === "day" && (
            <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
          )}

          {mode === "month" && (
            <div className="grid grid-cols-3 gap-1">{renderMonths()}</div>
          )}

          {mode === "year" && (
            <div>
              <div className="flex justify-between mb-2">
                <button
                  onClick={prevYears}
                  className="px-2 py-1 border rounded text-black"
                >
                  ◀
                </button>
                <button
                  onClick={nextYears}
                  className="px-2 py-1 border rounded text-black"
                >
                  ▶
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1">{renderYears()}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export { CustomTimePicker, CustomDatePicker };
