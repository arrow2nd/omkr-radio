import type { Radio } from "../../types/radio.ts";
import type { Episode } from "../../types/episode.ts";

import { DOMParser } from "../../deps.ts";
import { fetchEpisodeInfo } from "../../libs/fetch.ts";

async function createEpisodeData(radioId: string, tagName: string) {
  const episodes: Episode[] = [];

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

      // 詳細を取得
      const episodeInfo = await fetchEpisodeInfo(url);
      if (!episodeInfo) {
        console.log(`[NOT FOUND] ${title}`);
        continue;
      }

      const { episodeTitle, episodeNumber, desc, pubDate, source } =
        episodeInfo;

      episodes.push({
        title: episodeTitle,
        number: episodeNumber || 1,
        desc,
        source,
        link: url,
        pubDate,
      });

      // 2秒待つ
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  // 昇順でソート
  const results: Episode[] = episodes.sort((a, b) => a.number - b.number);

  Deno.writeTextFileSync(
    `./docs/json/${radioId}.json`,
    JSON.stringify(results, null, "\t")
  );
}

const radioList: Radio[] = JSON.parse(
  Deno.readTextFileSync("./docs/list.json")
);

for (const radio of radioList) {
  await createEpisodeData(radio.id, radio.tag);
}

console.log("[SUCCESS]");
