import type { Radio } from "../../types/radio.ts";
import type { Episode } from "../../types/episode.ts";

import { DOMParser } from "../../deps.ts";
import { parseTitle } from "../../libs/json/parse.ts";

//------------------------------------------------
const baseUrl = "https://omocoro.jp/rensai/45480/";
const sebunagata: Radio = {
  id: "sebunagata",
  title: "セブ山・永田の金曜ラジオ",
  tag: "金曜ラジオ",
  author: "セブ山,永田",
  desc: "2010年2月から2015年2月まで毎週金曜日に配信されていた、セブ山と永田によるインターネットラジオ。",
  thumbnail: "https://omocoro.jp/assets/uploads/kinnyourajio_650.jpg",
  link: "https://omocoro.jp/tag/%E9%87%91%E6%9B%9C%E3%83%A9%E3%82%B8%E3%82%AA/",
  nowOnAir: false,
};
//------------------------------------------------

const newEpisodes: Episode[] = [];

for (let i = 1; i < 6; i++) {
  console.log(`< page = ${i} >`);

  const url = i === 1 ? baseUrl : `${baseUrl}/${i}/`;
  const res = await fetch(url);
  if (res.status !== 200) {
    console.log("[END]");
    break;
  }

  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  if (doc === null) throw new Error("解析エラー");

  const body = doc.getElementsByClassName("article-body")[0];
  const p = body.getElementsByTagName("p").map((e) => {
    const href = e.getElementsByTagName("a")[0]?.getAttribute("href") || "";
    return {
      title: e.textContent,
      source: href,
    };
  });

  for (const { title, source } of p) {
    const parsed = parseTitle(title);
    if (!parsed) continue;

    const { episodeTitle, episodeNumber } = parsed;

    const radioFilePath = source.match(
      /https:\/\/omocoro\.heteml\.net\/radio\/(.*?\.mp3)/
    );
    if (!radioFilePath) continue;

    newEpisodes.push({
      title: episodeTitle,
      number: episodeNumber ?? -1,
      desc: sebunagata.desc,
      source,
      link: "https://omocoro.jp/rensai/45480/",
      pubDate: "",
    });
  }
}

// リスト読み込み
const listPath = "./docs/list.json";
const radioList: Radio[] = JSON.parse(Deno.readTextFileSync(listPath));

// 新規ラジオを追加
radioList.push(sebunagata);

// 五十音順（あ->ア->亜）でソート
radioList.sort((a, b) => a.title.localeCompare(b.title, "ja"));

// リストを更新
Deno.writeTextFileSync(listPath, JSON.stringify(radioList, null, "\t"));

// エピソードファイルを作成
const episodeJsonPath = `./docs/json/${sebunagata.id}.json`;
Deno.createSync(episodeJsonPath);

Deno.writeTextFileSync(
  episodeJsonPath,
  JSON.stringify(newEpisodes, null, "\t")
);
