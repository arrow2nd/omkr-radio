import { parseFeed } from "https://deno.land/x/rss/mod.ts";
import { addEpisode } from "./util/addEpisode.ts";

// RSSフィードを取得
const res = await fetch("https://omocoro.jp/feed");
if (!res.ok) {
  console.log(`[ ${res.status} : ${res.statusText} ]`);
  Deno.exit(0);
}

// RSSをパース
const xml = await res.text();
const feed = await parseFeed(xml);

for (const entriy of feed.entries) {
  const title = entriy.title?.value;
  const url = entriy.links[0].href;

  if (title && url) {
    addEpisode(title, url);
  }
}

console.log("[SUCCESS]");
