// app/experience/details/page.tsx - the old client-state-driven route is
// replaced by /experience/details/[id] (a real indexable URL per company).
// Redirect here for anyone hitting this bare path directly or via an old link.
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/experience");
}
