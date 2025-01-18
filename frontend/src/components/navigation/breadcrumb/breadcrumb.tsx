import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/features/lib/utils"
import { Link, useLocation } from "react-router-dom"

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const location = useLocation()

  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-[var(--text-secondary)]" aria-hidden="true" />
            <Link
              to={item.href}
              className={cn(
                "ml-2 text-sm font-medium hover:text-[var(--text-primary)] transition-colors",
                location.pathname === item.href
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              )}
              aria-current={location.pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
} 