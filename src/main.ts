import { addEpisode } from "./libs/json/add.ts";
import { updatePodcast } from "./libs/podcast/update.ts";

import { parseFeed } from "./deps.ts";

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

  if (!title || !url) continue;

  console.log("-".repeat(30));

  // 新規エピソードを追加
  const result = await addEpisode(url, false);

  // Podcastを更新
  if (result) {
    updatePodcast(result.id, result.episodes);
  }
}

console.log("[SUCCESS]");
