import { parseFeed } from "https://deno.land/x/rss@0.5.5/mod.ts";

import { addEpisode } from "./lib/add.ts";
import { notifySlack } from "./lib/notify.ts";

// RSSフィードを取得
const res = await fetch("https://omocoro.jp/feed");
if (!res.ok) {
  notifySlack("Error", `RSSが取得できませんでした\n${res.statusText}: ${res.statusText}`);
  Deno.exit(1);
}

// RSSをパース
const xml = await res.text();
const feed = await parseFeed(xml);

for (const entriy of feed.entries) {
  const title = entriy.title?.value;
  const url = entriy.links[0]?.href;

  if (title && url) {
    addEpisode(title, url);
  }
}

console.log("[SUCCESS]");
