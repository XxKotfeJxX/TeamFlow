import { useState, forwardRef } from "react"
import type { ReactNode } from "react"
import { cn } from "../../utils/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode  // <- змінили string на ReactNode
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    const [checked, setChecked] = useState(props.checked || false)

    return (
      <label className={cn("inline-flex items-center cursor-pointer select-none", className)}>
        <span className="relative w-5 h-5 mr-2 flex-none">
          <input
            type="checkbox"
            className="peer absolute w-5 h-5 opacity-0"
            ref={ref}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            {...props}
          />
          <span className="block w-5 h-5 rounded border border-gray-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors duration-200 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </span>
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </label>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
