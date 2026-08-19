import * as React from "react";
import { Icon } from "../Icon";
import type { IconName } from "@/lib/types";

type AlertVariant = "info" | "success" | "warning" | "danger";

const STYLES: Record<AlertVariant, { wrap: string; icon: IconName; iconClass: string }> = {
  info: {
    wrap: "border-brand-200 bg-brand-50 text-brand-900",
    icon: "info",
    iconClass: "text-brand-600",
  },
  success: {
    wrap: "border-emerald-200 bg-emerald-50 text-emerald-900",
    icon: "check",
    iconClass: "text-emerald-600",
  },
  warning: {
    wrap: "border-amber-200 bg-amber-50 text-amber-900",
    icon: "alert",
    iconClass: "text-amber-600",
  },
  danger: {
    wrap: "border-red-200 bg-red-50 text-red-900",
    icon: "alert",
    iconClass: "text-red-600",
  },
};

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: React.ReactNode;
  icon?: IconName;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  icon,
  className = "",
}: AlertProps) {
  const s = STYLES[variant];
  return (
    <div
      role={variant === "danger" || variant === "warning" ? "alert" : undefined}
      className={[
        "flex items-start gap-3 rounded-lg border p-3 text-sm",
        s.wrap,
        className,
      ].join(" ")}
    >
      <Icon
        name={icon ?? s.icon}
        size={18}
        className={["mt-0.5 shrink-0", s.iconClass].join(" ")}
      />
      <div className="min-w-0 flex-1">
        {title && <p className="mb-0.5 font-semibold">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
