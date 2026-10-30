import { readFileSync, writeFileSync } from "node:fs";

import type { Radio } from "@/types/json.ts";

const radioList = JSON.parse(readFileSync("./docs/list.json", "utf-8")) as Radio[];

let podcastList = `
|ラジオ名|Podcast フィード URL|更新中|
|-|-|-|
`;

for (const { title, id, nowOnAir } of radioList) {
  podcastList += `|${title}|https://arrow2nd.github.io/omkr-radio/podcast/${id}.rss|${
    nowOnAir ? "✅" : "❌"
  }
`;
}

const readme = readFileSync("./README.md", "utf-8");
const replaced = readme.replace(
  /(?<=<!-- podcast list start -->)[\s\S]+(?=<!-- podcast list end -->)/gm,
  podcastList,
);

writeFileSync("./README.md", replaced);
