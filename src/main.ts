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
if (!res.ok) {
  console.log(`[ ${res.status} : ${res.statusText} ]`);
  Deno.exit(0);
}

// RSSをパース
const xml = await res.text();
const { feed } = await deserializeFeed(xml, { outputJsonFeed: true });

for (const { title, external_url } of feed.items) {
  // ラジオ以外の記事ならスキップ
  if (!title || !external_url || !external_url.includes("radio")) continue;

  // ラジオのリストから情報を取得
  const radio = radioList.find((e) => title.includes(e.name));
  if (!radio) {
    console.log(`[NO SUPPORT] ${title}`);
    continue;
  }

  // 音源ファイルのパスを取得
  const radioFilePath = await fetchRadioFilePath(external_url);
  if (!radioFilePath) {
    console.log(`[NO AUDIO FILE] ${title}`);
    continue;
  }

  // 記事のタイトルからエピソード名・話数を抽出
  const [episodeName, episodeNum] = parseTitle(title, radio.name);
  if (!episodeNum) {
    console.log(`[NOT FOUND] ${title}`);
    continue;
  }

  const filePath = `./docs/data/${radio.id}.json`;
  const radioData: RadioData = JSON.parse(Deno.readTextFileSync(filePath));
  const addEpisode: Episode = {
    title: episodeName,
    number: episodeNum,
    path: radioFilePath,
  };

  // 重複確認
  const isDuplicate = radioData.episodes.some(
    (e) =>
      e.title === addEpisode.title &&
      e.number === addEpisode.number &&
      e.path === addEpisode.path,
  );
  if (isDuplicate) continue;

  // 追加して保存
  radioData.updated = new Date().toUTCString();
  radioData.episodes.push(addEpisode);
  Deno.writeTextFileSync(filePath, JSON.stringify(radioData, null, "\t"));

  console.log(`[ADDED] ${title} #${episodeNum} ${radioFilePath}`);
}

console.log("[SUCCESS]");
