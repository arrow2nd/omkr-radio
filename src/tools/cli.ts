import type { Radio } from "../types/radio.ts";
import type { Episode } from "../types/episode.ts";

import { fetchEpisodeInfo } from "../libs/fetch.ts";

// 値を入力
const pageUrl = prompt("ラジオページのURL");

if (!pageUrl) {
  throw new Error("入力された値が不正です");
}

// リスト読み込み
const listPath = "./docs/list.json";
const radioList: Radio[] = JSON.parse(Deno.readTextFileSync(listPath));

// 詳細を取得
const episodeInfo = await fetchEpisodeInfo(pageUrl);
if (!episodeInfo) {
  throw new Error("音源ファイルが見つかりませんでした");
}

const {
  id,
  radioTitle,
  tagName,
  tagLink,
  episodeTitle,
  episodeNumber,
  desc,
  pubDate,
  author,
  thumbnail,
  source,
} = episodeInfo;

const radioId = id || prompt("ラジオID") || "";

// 新規ラジオを追加
radioList.push({
  id: radioId,
  title: radioTitle,
  tag: tagName,
  author,
  desc,
  thumbnail,
  link: tagLink,
  nowOnAir: true,
});

// 五十音順（あ->ア->亜）でソート
radioList.sort((a, b) => a.title.localeCompare(b.title, "ja"));

// リストを更新
Deno.writeTextFileSync(listPath, JSON.stringify(radioList, null, "\t"));

// エピソードファイルを作成
const episodeJsonPath = `./docs/json/${id}.json`;
Deno.createSync(episodeJsonPath);

// データを作成して保存
const newEpisodeJson: Episode[] = [
  {
    title: episodeTitle,
    number: episodeNumber || 1,
    desc,
    source,
    link: pageUrl,
    pubDate,
  },
];

Deno.writeTextFileSync(
  episodeJsonPath,
  JSON.stringify(newEpisodeJson, null, "\t")
);
