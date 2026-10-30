import { readdirSync, readFileSync, writeFileSync } from "node:fs";

import type { Episode, Radio } from "@/types/json.ts";

import { createPodcastXml } from "@/libs/podcast/create.ts";

const radioList: Radio[] = JSON.parse(readFileSync("./docs/list.json", "utf-8"));

for (const entry of readdirSync("./docs/json/", { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  const { name } = entry;

  // リスト内にラジオがあるか確認
  const radio = radioList.find(({ id }) => id === name.replace(".json", ""));
  if (!radio) {
    console.log(`[SKIP] 不明なラジオです (${name})`);
    continue;
  }

  const episodes: Episode[] = JSON.parse(readFileSync(`./docs/json/${name}`, "utf-8"));

  const xml = createPodcastXml(radio, episodes);

  writeFileSync(`./docs/podcast/${radio.id}.rss`, xml);
  console.log(`[OK] 生成しました (${radio.id})`);
}
