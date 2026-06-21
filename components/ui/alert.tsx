import * as React from "react";
import { cn } from "@/lib/utils";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "warning" | "danger" | "success";
  icon?: React.ReactNode;
  title?: string;
}

export function Alert({ className, variant = "info", icon, title, children, ...props }: AlertProps) {
  const variants = {
    info:    "bg-[#f8f0ff] border-l-[#550084] text-[#2d0047]",
    warning: "bg-amber-50 border-l-amber-500 text-amber-900",
    danger:  "bg-red-50 border-l-red-500 text-red-900",
    success: "bg-emerald-50 border-l-emerald-500 text-emerald-900",
  };
  return (
    <div
      role="note"
      className={cn("rounded-xl border-l-4 p-4 flex gap-3 items-start text-base", variants[variant], className)}
      {...props}
    >
      {icon && <span className="flex-shrink-0 mt-0.5" aria-hidden="true">{icon}</span>}
      <div>
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
}
