import type { Radio } from "../types/radio.ts";
import type { Episode } from "../types/episode.ts";

import { createPodcastXml } from "../libs/podcast/create.ts";

// ラジオ一覧
const radioList: Radio[] = JSON.parse(
  Deno.readTextFileSync("./docs/list.json")
);

// 全てのラジオエピソードを順に読み込む
for (const { isFile, name } of Deno.readDirSync("./docs/json/")) {
  if (!isFile) continue;

  const radio = radioList.find(({ id }) => id === name.replace(".json", ""));
  if (!radio) {
    console.log(`[SKIP] 不明なラジオです (${name})`);
    continue;
  }

  const episodes: Episode[] = JSON.parse(
    Deno.readTextFileSync(`./docs/json/${name}`)
  );

  const xml = createPodcastXml(radio, episodes);

  Deno.writeTextFileSync(`./docs/podcast/${radio.id}.rss`, xml);
  console.log(`[OK] 生成しました (${radio.id})`);
}
