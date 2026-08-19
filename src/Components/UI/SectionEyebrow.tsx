import React from "react";
import { IconType } from "react-icons";

interface SectionEyebrowProps {
  label: string;
  icon?: IconType;
  index?: string;
  className?: string;
}

// Replaces the "glass-card rounded-full pill" eyebrow badge copy-pasted
// at the top of nearly every section with a monospace meta line - reads
// as a deliberate technical/editorial choice instead of another chip.
export default function SectionEyebrow({ label, icon: Icon, index, className = "" }: SectionEyebrowProps) {
  return (
    <div className={`eyebrow ${className}`}>
      {index && <span className="text-muted-foreground">{index}</span>}
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </div>
  );
}
