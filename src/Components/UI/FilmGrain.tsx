"use client";

// Fixed noise layer over the whole page. All of the appearance lives in
// .film-grain (globals.css); this exists only to place the element and keep
// it out of the accessibility tree.
export default function FilmGrain() {
  return <div className="film-grain" aria-hidden="true" />;
}
