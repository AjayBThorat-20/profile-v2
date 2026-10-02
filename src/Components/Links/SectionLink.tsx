"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SectionLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  /** A section link: "/#about" or "#about". */
  href: string;
};

// A next/link for section links ("/#about", "#contact") that also works when
// the URL already points at that section.
//
// next/link treats a click to the current URL as a no-op and suppresses the
// browser's own fragment jump, so with the address bar at /#about, clicking
// "About" in the footer after scrolling down did nothing at all. Here a click
// that targets the page you're on scrolls to the section directly (honouring
// its scroll-margin and the page's CSS scroll-behavior) and updates the hash.
// A click from another route, e.g. a detail page, is left to next/link, which
// navigates client-side and lands on the section.
export default function SectionLink({ href, onClick, ...rest }: SectionLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    // Leave modified clicks (new tab/window) and anything already handled alone.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    ) {
      return;
    }

    const [path, id] = href.split("#");
    if (!id || (path || pathname) !== pathname) return;

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ block: "start" });
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
