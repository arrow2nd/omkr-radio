import type { Radio } from "../../types/radio.ts";
import type { Episode } from "../../types/episode.ts";

import { DOMParser } from "../../deps.ts";
import { addEpisode } from "../../libs/add.ts";

async function createEpisodeData(id: string, tagName: string) {
  const episodeJsonPath = `./docs/json/${id}.json`;
  const episodes: Episode[] = JSON.parse(
    Deno.readTextFileSync(episodeJsonPath)
  );

  for (let pageNum = 1; ; pageNum++) {
    console.log(`[ PAGE: ${pageNum} ]`);

    // 一覧ページを取得
    const res = await fetch(
      `https://omocoro.jp/tag/${encodeURIComponent(tagName)}/page/${pageNum}/`
    );

    if (res.status !== 200) {
      console.log("[END]");
      break;
    }

    // HTMLをパース
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    if (!doc) throw new Error("解析エラー");

    // 記事へのリンクを抽出
    const articles = doc.getElementsByClassName("title").map((e) => {
      const href = e.getElementsByTagName("a")[0]?.getAttribute("href") || "";
      return {
        title: e.textContent,
        url: href,
      };
    });

    for (const { title, url } of articles) {
      // ラジオの記事ではないならスキップ
      if (!/^https:\/\/omocoro.jp\/(radio|rensai)/.test(url)) continue;

      // 重複するならスキップ
      if (episodes.find((e) => title.includes(e.title))) continue;

      addEpisode(url);

      // 5秒待つ
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

const radioList: Radio[] = JSON.parse(
  Deno.readTextFileSync("./docs/list.json")
);

for (const { id, tag } of radioList) {
  await createEpisodeData(id, tag);
}

console.log("[SUCCESS]");
