// deno-lint-ignore-file camelcase
import { deserializeFeed } from "https://deno.land/x/rss@0.5.3/mod.ts";
import { Episode, ListItem, RadioData } from "./type.ts";
import { fetchRadioFilePath } from "./util/fetchRadioUrl.ts";
import { parseTitle } from "./util/parseTitle.ts";

const radioList: ListItem[] = JSON.parse(
  Deno.readTextFileSync("./docs/list.json"),
).filter((e: ListItem) => e.onAir);

// RSSフィードを取得
const res = await fetch("https://omocoro.jp/feed");
const xml = await res.text();
const { feed } = await deserializeFeed(xml, { outputJsonFeed: true });

for (const { title, external_url } of feed.items) {
  // ラジオ以外ならスキップ
  if (!title || !external_url || !external_url.includes("radio")) continue;

  // ラジオ名をリストから取得
  const radioName = radioList.find((e) => title.includes(e.name))?.name;
  if (!radioName) {
    console.log(`[NO SUPPORT] ${title}`);
    continue;
  }

  const radioFilePath = await fetchRadioFilePath(external_url);

  // エピソード名・話数を抽出
  const [episodeName, episodeNum] = parseTitle(title, radioName);
  if (!episodeNum) {
    console.log(`[NOT FOUND] ${title}`);
    continue;
  }

  const filePath = `./docs/data/${radioName}.json`;
  const radioData: RadioData = JSON.parse(Deno.readTextFileSync(filePath));

  // 重複確認
  const addEpisode: Episode = {
    title: episodeName,
    number: episodeNum,
    path: radioFilePath,
  };

  const isDuplicate = radioData.episodes.some(
    (e) =>
      e.title === addEpisode.title &&
      e.number === addEpisode.number &&
      e.path === addEpisode.path,
  );

  if (isDuplicate) continue;

  // 追加して保存
  radioData.updated = new Date();
  radioData.episodes.push(addEpisode);
  Deno.writeTextFileSync(filePath, JSON.stringify(radioData, null, "\t"));

  console.log(`[ADDED] ${title} #${episodeNum} ${radioFilePath}`);
}

console.log("[SUCCESS]");
