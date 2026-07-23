import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface IndeterminateCheckboxProps {
  checked: boolean
  indeterminate?: boolean
  onChange: () => void
  'aria-label': string
  className?: string
}

export default function IndeterminateCheckbox({
  checked,
  indeterminate = false,
  onChange,
  className,
  ...rest
}: IndeterminateCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      onClick={(e) => e.stopPropagation()}
      className={cn('iris-checkbox', className)}
      {...rest}
    />
  )
}
