import { DOMParser } from "deno-dom-wasm";

import type { Episode, Radio } from "@/types/json.ts";

import { addRadio } from "@/libs/json/add.ts";
import { parseTitle } from "@/libs/json/parse.ts";
import { fetchWithTimeout } from "@/libs/util.ts";

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
  console.log(`[PAGE: ${i}]`);

  const url = i === 1 ? baseUrl : `${baseUrl}/${i}/`;
  const res = await fetchWithTimeout(url);

  if (!res.ok) {
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
      /https:\/\/omocoro\.heteml\.net\/radio\/(.*?\.mp3)/,
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

// 新規ラジオを追加
addRadio(sebunagata);

// エピソードファイルを作成
const episodeJsonPath = `./docs/json/${sebunagata.id}.json`;
Deno.createSync(episodeJsonPath);

Deno.writeTextFileSync(
  episodeJsonPath,
  JSON.stringify(newEpisodes, null, "\t"),
);
