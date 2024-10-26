// src/components/ui/card.tsx
import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        className={clsx(
          'bg-white rounded-lg border border-gray-200 shadow-sm',
          {
            'transition-shadow duration-200 hover:shadow-md': hover,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

export default Card