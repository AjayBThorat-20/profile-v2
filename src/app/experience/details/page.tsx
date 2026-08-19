// app/experience/details/page.tsx - the old client-state-driven route is
// replaced by /experience/details/[id] (a real indexable URL per company).
// Redirect here for anyone hitting this bare path directly or via an old link.
// A permanent (308) redirect tells search engines to consolidate ranking
// signal onto /experience instead of re-checking this URL on every crawl.
import { permanentRedirect } from "next/navigation";

export default function Page() {
  permanentRedirect("/experience");
}
