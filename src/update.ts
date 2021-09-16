// deno-lint-ignore-file camelcase
import { deserializeFeed } from "https://deno.land/x/rss@0.5.3/mod.ts";
import { RadioData, RadioItem, ListItem } from "./type.ts";
import { extractNumFromTitle, fetchRadioUrl } from "./util.ts";

const radioList: ListItem[] = JSON.parse(
  Deno.readTextFileSync("./docs/list.json")
);

// RSSフィードを取得
const res = await fetch("https://omocoro.jp/feed");
const xml = await res.text();
const { feed } = await deserializeFeed(xml, { outputJsonFeed: true });

for (const { title, external_url } of feed.items) {
  // ラジオ以外ならスキップ
  if (!title || !external_url || !external_url.includes("radio")) continue;

  const radioName = radioList.find((e) => title.includes(e.name))?.name;
  if (!radioName) {
    console.log(`[NO SUPPORT] ${title}`);
    continue;
  }

  const url = await fetchRadioUrl(external_url);

  const num = extractNumFromTitle(title, radioName);
  if (!num) {
    console.log(`[NOT FOUND] ${title}`);
    continue;
  }

  const filePath = `./docs/data/${radioName}.json`;
  const data: RadioData = JSON.parse(Deno.readTextFileSync(filePath));

  // 重複確認
  const addData: RadioItem = { title, num, url };
  if (
    data.items.some(
      (e) =>
        e.title === addData.title &&
        e.num === addData.num &&
        e.url === addData.url
    )
  ) {
    continue;
  }

  // 追加して保存
  data.items.push(addData);
  Deno.writeTextFileSync(filePath, JSON.stringify(data, null, "\t"));

  console.log(`[ADDED] ${title} #${num} ${url}`);
}

console.log("[SUCCESS]");
