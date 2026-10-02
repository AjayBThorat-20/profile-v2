import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared renderer for the code-generated Open Graph cards (the root
// opengraph-image and the per-role ones under /experience/details/[id]).
//
// These replace the images the metadata used to point at: a portrait photo
// (853x1280, 893 KB PNG) and three small company logos, all declared as
// 1200x630. Link previews on LinkedIn, X and WhatsApp crop to ~1.91:1, so
// the photo was cut through the middle and the logos were upscaled. These
// cards are drawn at exactly 1200x630 in the site's own type and palette.

// Assets don't depend on the request, so they are read once at module scope.
// next/og can't read the WOFF2 files next/font serves the page, hence the
// static TTFs in assets/fonts (see the README there).
const [fraunces, soraRegular, soraSemiBold, portrait] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Fraunces-ExtraBold.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Sora-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Sora-SemiBold.ttf")),
  readFile(join(process.cwd(), "assets/og/portrait.jpg"), "base64"),
]);
const portraitSrc = `data:image/jpeg;base64,${portrait}`;

// Dark-theme tokens from globals.css, as hex: next/og can't read CSS vars.
const INK = "#111111";
const PAPER = "#f5f5f5";
const MUTED = "#a3a3a3";
const RULE = "#2e2e2e";

export function renderOgCard({
  eyebrow,
  title,
  titleSize,
  subtitle,
  meta,
  footnote,
}: {
  eyebrow: string;
  title: string;
  titleSize: number;
  subtitle: string;
  // Optional muted line under the subtitle (e.g. a role's dates), kept
  // separate so it never wraps mid-phrase onto the subtitle's line.
  meta?: string;
  footnote: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          color: PAPER,
          padding: "64px 72px",
          fontFamily: "Sora",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            paddingRight: 56,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 4,
                color: MUTED,
              }}
            >
              <div style={{ width: 40, height: 2, background: PAPER, marginRight: 16 }} />
              {eyebrow}
            </div>
            <div
              style={{
                fontFamily: "Fraunces",
                fontSize: titleSize,
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: -2,
                marginTop: 28,
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.4, color: "#d4d4d4", marginTop: 28 }}>
              {subtitle}
            </div>
            {meta && (
              <div style={{ fontSize: 24, color: MUTED, marginTop: 10 }}>{meta}</div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${RULE}`,
              paddingTop: 24,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <div style={{ color: MUTED, fontSize: 19 }}>{footnote}</div>
            <div>ajaythorat.com</div>
          </div>
        </div>

        {/* The portrait with its offset solid frame, as in the hero. */}
        <div style={{ display: "flex", position: "relative", width: 396, height: 466, alignSelf: "center" }}>
          <div style={{ position: "absolute", left: 16, top: 16, width: 380, height: 450, background: PAPER }} />
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img>; next/image doesn't apply here */}
          <img
            src={portraitSrc}
            width={380}
            height={450}
            alt=""
            style={{ position: "absolute", left: 0, top: 0, border: `1px solid ${RULE}` }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 800 },
        { name: "Sora", data: soraRegular, style: "normal", weight: 400 },
        { name: "Sora", data: soraSemiBold, style: "normal", weight: 600 },
      ],
    }
  );
}
