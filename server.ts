import { listenAndServe } from "https://deno.land/std@0.112.0/http/server.ts";
import { hasAsset, getAsset } from "./lib/assets.ts";

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  if (hasAsset(pathname)) {
    return getAsset(pathname);
  }

  const body = await Deno.readFile("./assets/404.html");

  return new Response(body, {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

await listenAndServe(":8080", (req) => handleRequest(req));
