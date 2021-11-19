import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { hasAsset, getAsset } from "./lib/assets.ts";

serve(async (req) => {
  const { pathname } = new URL(req.url);

  if (hasAsset(pathname)) {
    return getAsset(pathname);
  }

  const body = await Deno.readTextFile("./assets/404.html");
  return new Response(body, {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});
