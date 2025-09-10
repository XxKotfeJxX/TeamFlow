import type { InputHTMLAttributes } from "react"
import { cn } from "../../utils/utils"

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm",
        "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
        "placeholder-gray-400",
        className
      )}
      {...props}
    />
  )
}
