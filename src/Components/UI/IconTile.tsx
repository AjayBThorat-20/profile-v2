import React from "react";
import { IconType } from "react-icons";
import { AccentClasses } from "./accentColor";

interface IconTileProps {
  icon: IconType;
  accent: AccentClasses;
  index?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<IconTileProps["size"]>, { box: string; icon: string }> = {
  sm: { box: "w-10 h-10 rounded-lg", icon: "w-4 h-4" },
  md: { box: "w-12 h-12 rounded-xl", icon: "w-5 h-5" },
  lg: { box: "w-14 h-14 rounded-xl", icon: "w-6 h-6" },
};

// Replaces the "icon in a saturated gradient box that rotates on hover"
// motif copy-pasted across ~8 components with an outlined tile: thin
// accent border, faint accent tint fill, icon rendered in the accent
// color rather than white-on-gradient.
export default function IconTile({ icon: Icon, accent, index, size = "md", className = "" }: IconTileProps) {
  const { box, icon } = SIZE_CLASSES[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 border ${accent.border} ${accent.bgSoft} ${box} transition-colors duration-150 ${accent.groupHoverBorder} ${className}`}
    >
      <Icon className={`${icon} ${accent.text}`} />
      {typeof index === "number" && (
        <span
          className={`absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-card border ${accent.border} text-[10px] font-mono font-semibold ${accent.text}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
