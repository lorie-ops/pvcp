import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ExpandableTextProps {
  children: React.ReactNode
  className?: string
}

export default function ExpandableText({ children, className }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    setIsOverflowing(el.scrollHeight > el.clientHeight + 1)
  }, [children])

  return (
    <div>
      <p ref={ref} className={cn(!isExpanded && 'line-clamp-[10]', className)}>
        {children}
      </p>
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded((v) => !v)}
          className="mt-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700"
        >
          {isExpanded ? 'Voir moins' : 'Voir plus'}
        </button>
      )}
    </div>
  )
}
