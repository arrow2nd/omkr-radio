import { readFileSync, writeFileSync } from "node:fs";

import type { Episode, Radio } from "@/types/json.ts";

import { createPodcastXml } from "@/libs/podcast/create.ts";

/**
 * Podcastを更新
 * @param radioId ラジオID
 * @param episodes エピソード一覧
 */
export function updatePodcast(radioId: string, episodes: Episode[]) {
  const radioList: Radio[] = JSON.parse(readFileSync("./docs/list.json", "utf-8"));

  const radio = radioList.find(({ id }) => id === radioId);
  if (!radio) return;

  const xml = createPodcastXml(radio, episodes);

  writeFileSync(`./docs/podcast/${radio.id}.rss`, xml);
  console.log(`[OK] Podcastを更新しました (${radio.id})`);
}
