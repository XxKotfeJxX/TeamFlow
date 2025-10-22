import type { LabelHTMLAttributes } from "react";
import { cn } from "../../utils/utils";

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium text-gray-700", className)}
      {...props}
    />
  );
}
