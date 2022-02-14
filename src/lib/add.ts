import type { Episode, ListItem, RadioData } from "../types/radio.ts";

import { fetchRadioFilePath } from "./fetch.ts";
import { parseTitle } from "./parse.ts";
import { notifySlack } from "./notify.ts";

const radioList: ListItem[] = JSON.parse(
  Deno.readTextFileSync("./docs/list.json"),
).filter((e: ListItem) => e.onAir);

/**
 * 新しいエピソードを追加
 * @param title 記事タイトル
 * @param url 記事URL
 */
export async function addEpisode(title: string, url: string) {
  // ラジオ以外の記事ならスキップ
  if (!url.includes("radio")) return;

  // ラジオのリストから情報を取得
  const radio = radioList.find((e) => title.includes(e.name));
  if (!radio) {
    notifySlack("Info", `新規のラジオが配信されています。\n<${url}|${title}>`);
    return;
  }

  // 音源ファイルのパスを取得
  const radioFilePath = await fetchRadioFilePath(url);
  if (!radioFilePath) {
    console.log(`[NO AUDIO FILE] ${title}`);
    return;
  }

  // 記事のタイトルからエピソード名・話数を抽出
  const [episodeName, episodeNum] = parseTitle(title, radio.name);
  if (!episodeNum) {
    notifySlack("Error", `新規エピソードが配信されていますが、話数の抽出に失敗しました。\n<${url}|${title}>`);
    return;
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
  if (isDuplicate) return;

  // 追加して保存
  radioData.updated = new Date().toUTCString();
  radioData.episodes.push(addEpisode);
  Deno.writeTextFileSync(filePath, JSON.stringify(radioData, null, "\t"));

  console.log(`[ADDED] ${title} #${episodeNum} ${radioFilePath}`);
}
