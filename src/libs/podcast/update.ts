import type { Episode, Radio } from "../../types/json.ts";

import { createPodcastXml } from "./create.ts";

/**
 * Podcastを更新
 * @param radioId ラジオID
 * @param episodes エピソード一覧
 */
export function updatePodcast(radioId: string, episodes: Episode[]) {
  const radioList: Radio[] = JSON.parse(
    Deno.readTextFileSync("./docs/list.json")
  );

  const radio = radioList.find(({ id }) => id === radioId);
  if (!radio) return;

  const xml = createPodcastXml(radio, episodes);

  Deno.writeTextFileSync(`./docs/podcast/${radio.id}.rss`, xml);
  console.log(`[OK] Podcastを更新しました (${radio.id})`);
}
