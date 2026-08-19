import React from "react";
import { IconType } from "react-icons";
import { AccentClasses } from "./accentColor";

// Replaces the alternating zig-zag timeline with a pulsing circular
// medallion that education.tsx and experience.tsx each reimplemented
// independently, with a single left-aligned rail (changelog/git-log
// style). This is a structural shell only - callers keep their own
// per-item field layout inside `children`, they just stop hand-building
// the rail line / node / connecting markup.

export function TimelineRail({ children }: { children: React.ReactNode }) {
  return <div className="timeline-rail">{children}</div>;
}

interface TimelineItemProps {
  icon: IconType;
  accent: AccentClasses;
  meta: string;
  children: React.ReactNode;
}

export function TimelineItem({ icon: Icon, accent, meta, children }: TimelineItemProps) {
  return (
    <div className="relative flex gap-4 md:gap-6 pb-8 last:pb-0">
      <div
        className={`timeline-node ${accent.timelineNode} mt-1.5 flex items-center justify-center`}
      >
        <Icon className="w-3 h-3 text-white" />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <p className={`font-mono text-xs font-semibold tracking-wide ${accent.text}`}>{meta}</p>
        {children}
      </div>
    </div>
  );
}
