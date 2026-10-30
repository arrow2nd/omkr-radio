import { XMLParser } from "fast-xml-parser";

import { addEpisode } from "@/libs/json/add.ts";
import { updatePodcast } from "@/libs/podcast/update.ts";
import { fetchWithTimeout } from "@/libs/util.ts";

// RSSフィードを取得
const res = await fetchWithTimeout("https://omocoro.jp/feed");

if (!res.ok) {
  throw new Error(`RSSが取得できませんでした\n${res.statusText}: ${res.statusText}`);
}

// RSSをパース
const xml = await res.text();
const feed = new XMLParser({
  isArray: (name) => name === "item",
}).parse(xml);

const items: { title?: unknown; link?: unknown }[] = feed.rss?.channel?.item ?? [];

for (const item of items) {
  const title = item.title?.toString();
  const url = item.link?.toString();

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
