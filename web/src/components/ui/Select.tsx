import type { ReactNode, SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800',
        className
      )}
      {...props}
    />
  )
}

export function SelectItem({ value, children }: { value: string; children: ReactNode }) {
  return <option value={value} className="text-gray-800">{children}</option>
}

export function SelectTrigger({
    children,
    className,
    ...props
  }: SelectHTMLAttributes<HTMLDivElement>) {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <div className="text-gray-500">{placeholder}</div>
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}