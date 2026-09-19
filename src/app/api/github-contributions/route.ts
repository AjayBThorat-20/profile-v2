// src/app/api/github-contributions/route.ts
import { NextResponse } from "next/server";
import { fetchContributions } from "@/lib/github";

// Cached at the CDN/browser for 30 minutes and served stale for up to an hour
// while it refreshes, so the graph stays close to real time without hitting
// GitHub on every page view.
export async function GET() {
  const data = await fetchContributions();
  if (!data) {
    return NextResponse.json({ error: "GitHub contributions are unavailable" }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json(data, { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } });
}
