import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider as Provider,
  ToastTitle,
  ToastViewport,
  getToastIcon,
} from "@/features/shared/components/toast"
import { useToast } from "@/features/hooks/useToast"

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts } = useToast()

  return (
    <Provider>
      {children}
      {toasts.map(({ id, title, description, type, action, ...props }) => {
        return (
          <Toast key={id} variant={type} {...props}>
            <div className="flex gap-3">
              {getToastIcon(type)}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
                {action && (
                  <div className="mt-2">
                    <button
                      className="text-sm font-medium text-[var(--brand-default)] hover:text-[var(--brand-emphasis)]"
                      onClick={action.onClick}
                    >
                      {action.label}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </Provider>
  )
} 