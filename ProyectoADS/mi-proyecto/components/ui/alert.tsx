// components/ui/alert.tsx
"use client"

import * as React from "react"
import { AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function Alert({
  children,
  variant = "info",
  className,
}: {
  children: React.ReactNode
  variant?: "info" | "warning"
  className?: string
}) {
  const icon = variant === "warning" ? (
    <AlertTriangle className="w-5 h-5 text-yellow-600" />
  ) : (
    <Info className="w-5 h-5 text-blue-600" />
  )

  return (
    <div
      className={cn(
        "flex items-start space-x-3 p-4 border rounded-md",
        variant === "warning"
          ? "bg-yellow-50 border-yellow-200 text-yellow-700"
          : "bg-blue-50 border-blue-200 text-blue-700",
        className
      )}
    >
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm">{children}</p>
}
