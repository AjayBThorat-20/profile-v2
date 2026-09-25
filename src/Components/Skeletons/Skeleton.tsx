import React from "react";

// One placeholder shape. Appearance lives in .skeleton (globals.css); this just
// places it and keeps it out of the accessibility tree - the shapes themselves
// are meaningless, so the surrounding container is what carries role="status"
// and a label describing what is loading.
export default function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton ${className}`} />;
}
