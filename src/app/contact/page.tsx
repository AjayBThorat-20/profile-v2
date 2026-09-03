// /contact is now the "contact" section on the single-page site. Redirect
// here for anyone hitting this URL directly or via an old link. A permanent
// (308) redirect consolidates SEO ranking signal onto "/".
import { permanentRedirect } from "next/navigation";

export default function Page() {
  permanentRedirect("/#contact");
}
