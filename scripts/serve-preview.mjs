import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzipSync } from "node:zlib";
const directory = resolve("dist/client");
const port = Number(process.argv[2] || 3000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".json": "application/json",
};
const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405);
    response.end();
    return;
  }
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const file = resolve(
      directory,
      "." + (pathname === "/" ? "/index.html" : pathname),
    );
    if (!file.startsWith(directory + sep)) {
      response.writeHead(403);
      response.end();
      return;
    }
    let bytes = await readFile(file);
    const type = mime[extname(file)] || "application/octet-stream";
    const headers = {
      "Content-Type": type,
      "Cache-Control": pathname.startsWith("/assets/")
        ? "public,max-age=31536000,immutable"
        : "no-cache",
      "X-Content-Type-Options": "nosniff",
    };
    if (
      /text\/|application\/json/.test(type) &&
      request.headers["accept-encoding"]?.includes("gzip")
    ) {
      bytes = gzipSync(bytes);
      headers["Content-Encoding"] = "gzip";
      headers.Vary = "Accept-Encoding";
    }
    headers["Content-Length"] = bytes.length;
    response.writeHead(200, headers);
    response.end(request.method === "HEAD" ? undefined : bytes);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Page not found");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`UZO production preview: http://127.0.0.1:${port}/`),
);
