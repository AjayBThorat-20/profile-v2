# Fonts for generated social images

Static TTF instances used only by the code-generated Open Graph cards
(`src/lib/ogCard.tsx`). `next/og` cannot read the WOFF2 files that
`next/font` serves to the page, so these are the same families at the
weights the cards use, fetched from Google Fonts.

- `Fraunces-ExtraBold.ttf` (Fraunces, weight 800)
- `Sora-Regular.ttf`, `Sora-SemiBold.ttf` (Sora, weights 400 and 600)

Both families are licensed under the SIL Open Font License 1.1
(https://openfontlicense.org).
