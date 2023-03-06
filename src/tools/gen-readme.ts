import type { Radio } from "@/types/json.ts";

const radioList = JSON.parse(
  Deno.readTextFileSync("./docs/list.json"),
) as Radio[];

let podcastList = `
|ラジオ名|Podcast フィード URL|更新中|
|-|-|-|
`;

for (const { title, id, nowOnAir } of radioList) {
  podcastList +=
    `|${title}|https://arrow2nd.github.io/omkr-radio/podcast/${id}.rss|${
      nowOnAir ? "✅" : "❌"
    }
`;
}

const readme = Deno.readTextFileSync("./README.md");
const replaced = readme.replace(
  /(?<=<!-- podcast list start -->)[\s\S]+(?=<!-- podcast list end -->)/gm,
  podcastList,
);

Deno.writeTextFileSync("./README.md", replaced);
