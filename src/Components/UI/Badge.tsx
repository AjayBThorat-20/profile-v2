import React from "react";
import { IconType } from "react-icons";
import { AccentClasses } from "./accentColor";

interface BadgeProps {
  children: React.ReactNode;
  accent?: AccentClasses;
  tone?: "neutral" | "success";
  icon?: IconType;
  dot?: boolean;
  className?: string;
}

// Replaces the 10+ independently copy-pasted pill className strings
// across the site (verified/current status pills, tech tags, floating
// hero chips, review stat pills) with one component, so pill styling
// drifts in one place instead of many.
export default function Badge({ children, accent, tone = "neutral", icon: Icon, dot, className = "" }: BadgeProps) {
  const toneClasses =
    tone === "success"
      ? "text-green-600 dark:text-green-400 border-green-500/30"
      : `${accent?.text ?? "text-foreground"} border-border`;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 border text-xs font-semibold uppercase tracking-wide ${toneClasses} ${className}`}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
