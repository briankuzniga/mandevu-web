import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const build = new URL("dist/client/", root);
const types = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
};
const read = (path) => readFile(new URL(path, build), "utf8");

let html = await read("index.html");
const stylesheets = [
  ...html.matchAll(
    /<link\b(?=[^>]*\brel="stylesheet")[^>]*\bhref="(\/[^"]+)"[^>]*>/g,
  ),
];
if (!stylesheets.length) throw new Error("The built page has no stylesheet.");
for (const [tag, path] of stylesheets) {
  const css = await read(path.slice(1));
  html = html.replace(tag, () => `<style>${css}</style>`);
}

// Replace application hydration with the shared, standalone motion code.
html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
html = html.replace(
  /<link\b(?=[^>]*\brel="(?:modulepreload|preload)")[^>]*>/g,
  "",
);
const assets = new Set(
  [...html.matchAll(/\/assets\/[\w.-]+\.(?:jpg|png|webp|svg|ttf)\b/g)].map(
    ([path]) => path,
  ),
);
for (const path of assets) {
  const data = await readFile(new URL(path.slice(1), build));
  html = html.replaceAll(
    path,
    `data:${types[extname(path)]};base64,${data.toString("base64")}`,
  );
}

const licenses = await Promise.all(
  ["cormorant-garamond", "montserrat"].map((name) =>
    read(`assets/license-${name}.txt`),
  ),
);
const notices = licenses.map((license) => `<!--\n${license}\n-->`).join("\n");
const motionSource = await readFile(
  new URL("src/routes/-sections/use-landing-motion.ts", root),
  "utf8",
);
const { outputText: motionScript } = ts.transpileModule(motionSource, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
  },
});
html = html.replace(
  "</body>",
  () => `<script type="module">${motionScript}
mountLandingMotion();</script></body>`,
);
const output = new URL("exports/mandevu-ui-preview.html", root);
await mkdir(new URL("./", output), { recursive: true });
await writeFile(
  output,
  html.replace("</head>", () => `${notices}\n</head>`),
);
console.log("Exported exports/mandevu-ui-preview.html");
