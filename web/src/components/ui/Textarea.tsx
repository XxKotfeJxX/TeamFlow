import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: string | number;
  fadeHeight?: number;
  fadeColor?: string;
}

export function Textarea({
  className,
  height = 120,
  fadeHeight = 30,
  fadeColor = "#fff",
  ...props
}: TextareaProps) {
  return (
    <div className="relative w-full" style={{ height: typeof height === "number" ? height : undefined }}>
      <textarea
        className={cn(
          "w-full h-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm resize-none overflow-auto relative z-10",
          "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
          className
        )}
        {...props}
      />
      {fadeHeight > 0 && (
        <div
          className="pointer-events-none absolute left-0 bottom-0 w-full rounded-b-md"
          style={{
            height: fadeHeight,
            background: `linear-gradient(to bottom, rgba(255,255,255,0), ${fadeColor})`,
            zIndex: 20, // поверх контенту, але під border
          }}
        />
      )}
    </div>
  );
}
