import type { Episode, ListItem, RadioData } from "../types/radio.ts";

import { fetchRadioFilePath } from "./fetch.ts";
import { parseTitle } from "./parse.ts";

const radioList: ListItem[] = JSON.parse(Deno.readTextFileSync("./docs/list.json"));

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
    console.log(`title: ${title}\nurl: ${url}`)
    throw new Error(`新規のラジオが配信されています`)
  } else if (!radio.onAir) {
    return
  }

  // 音源ファイルのパスを取得
  const radioFilePath = await fetchRadioFilePath(url);
  if (!radioFilePath) {
    console.log(`radioId: ${radio.id}\ntitle: ${title}\nurl: ${url}`)
    console.info(`[NO AUDIO FILE] ${title}`);
    return;
  }

  const filePath = `./docs/data/${radio.id}.json`;
  const radioData: RadioData = JSON.parse(Deno.readTextFileSync(filePath));

  // 記事のタイトルからエピソード名・話数を抽出
  const [episodeTitle, episodeNumber] = parseTitle(title, radio.name);

  const addEpisode: Episode = {
    title: episodeTitle,
    number: episodeNumber || radioData.episodes.slice(-1)[0].number + 1,
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
  
  console.info(`[ADDED]`);
  console.log(`
  radioId: ${radio.id}
  title: ${addEpisode.title}
  number: ${addEpisode.number}
  path: ${addEpisode.path}
  `)
}
