import type { Episode, Radio } from "../../types/json.ts";

import { createPodcastXml } from "../../libs/podcast/create.ts";

const radioList: Radio[] = JSON.parse(
  Deno.readTextFileSync("./docs/list.json")
);

for (const { isFile, name } of Deno.readDirSync("./docs/json/")) {
  if (!isFile) continue;

  // リスト内にラジオがあるか確認
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
