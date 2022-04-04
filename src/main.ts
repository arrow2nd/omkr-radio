import { parseFeed } from "./deps.ts";
import { addEpisode } from "./libs/add.ts";

// RSSフィードを取得
const res = await fetch("https://omocoro.jp/feed");

if (!res.ok) {
  throw new Error(
    `RSSが取得できませんでした\n${res.statusText}: ${res.statusText}`
  );
}

// RSSをパース
const xml = await res.text();
const feed = await parseFeed(xml);

for (const entriy of feed.entries) {
  const title = entriy.title?.value;
  const url = entriy.links[0]?.href;

  if (title && url) {
    await addEpisode(url);
  }
}

console.log("[SUCCESS]");
