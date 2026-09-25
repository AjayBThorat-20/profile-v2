// Flat config. Next 16 removed the `next lint` command, which is what this
// project's "lint" script called - so linting has silently done nothing since
// the upgrade. This restores it through the ESLint CLI, which is the migration
// path Next documents.
//
// eslint-config-next 16 ships flat configs directly, so these are spread in
// rather than wrapped in FlatCompat (the old .eslintrc bridge, which chokes on
// this config's circular plugin references).
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const asArray = (config) => (Array.isArray(config) ? config : [config]);

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".devcompass/**",
      ".devcompass-backups/**",
      "next-env.d.ts",
      "tsconfig.tsbuildinfo",
    ],
  },
  ...asArray(nextCoreWebVitals),
  ...asArray(nextTypescript),
  {
    // Last on purpose: flat config resolves in order and the last match wins,
    // so an override placed ahead of the shared configs would just be undone by
    // them. Jest's config is CommonJS by design - it is loaded by Jest, not by
    // the app bundle, so require() is correct there rather than a lapse.
    files: ["**/*.config.js", "**/*.config.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
];

export default config;
