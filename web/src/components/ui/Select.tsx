import type { ReactNode, HTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "../../utils/utils";

// Натівний select
export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800",
        className
      )}
      {...props}
    />
  );
}

// Елемент опції
export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return (
    <option value={value} className="text-gray-800">
      {children}
    </option>
  );
}

// Триггер (візуальна оболонка для кастомного select)
export function SelectTrigger({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Значення select
interface SelectValueProps {
  value?: string;
  placeholder?: string;
}
export function SelectValue({ value, placeholder }: SelectValueProps) {
  return <span className={cn("text-gray-500")}>{value || placeholder}</span>;
}

// Контент опцій (може бути просто фрагмент)
export function SelectContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
