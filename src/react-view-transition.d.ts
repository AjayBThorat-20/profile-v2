// Next 16's App Router builds against its own vendored React canary
// (node_modules/next/dist/compiled/react, currently 19.3.0-canary), which
// exports `ViewTransition`. The installed @types/react tracks the stable 19.x
// release, which does not declare it yet - so the component exists at runtime
// and in the bundle, but `tsc` (which `next build` runs) rejects the import.
//
// This declares only that missing export. Delete it once @types/react ships
// ViewTransition; the import site needs no change when that happens.
import type { ReactNode, ComponentType } from "react";

declare module "react" {
  interface ViewTransitionInstance {
    group: Animation[];
    imagePair: Animation[];
    old: Animation[];
    new: Animation[];
  }

  type ViewTransitionClass = string | "none" | "auto";

  interface ViewTransitionProps {
    children?: ReactNode;
    /** Pairs this element with the identically-named one on the other route. */
    name?: string;
    /** Class applied when no more specific trigger matches. "none" opts out. */
    default?: ViewTransitionClass;
    /** Class applied when an element of the same `name` exists on both sides. */
    share?: ViewTransitionClass;
    enter?: ViewTransitionClass;
    exit?: ViewTransitionClass;
    update?: ViewTransitionClass;
    onEnter?: (instance: ViewTransitionInstance, types: string[]) => void;
    onExit?: (instance: ViewTransitionInstance, types: string[]) => void;
    onShare?: (instance: ViewTransitionInstance, types: string[]) => void;
    onUpdate?: (instance: ViewTransitionInstance, types: string[]) => void;
  }

  export const ViewTransition: ComponentType<ViewTransitionProps>;
}
