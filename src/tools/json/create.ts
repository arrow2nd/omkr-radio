import type { Episode, Radio } from "../../types/json.ts";

import { DOMParser } from "../../deps.ts";
import { addEpisode } from "../../libs/json/add.ts";

/**
 * 全てのエピソードを読み込む
 * @returns 全エピソード
 */
function loadAllEpisodes() {
  let results: Episode[] = [];

  for (const { isFile, name } of Deno.readDirSync("./docs/json/")) {
    if (!isFile) continue;

    const data = JSON.parse(Deno.readTextFileSync(`./docs/json/${name}`));
    results = results.concat(data);
  }

  return results;
}

/**
 * 指定秒数間待機
 * @param sec 秒数
 */
async function wait(sec: number) {
  await new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

/**
 * エピソード一覧を作成
 * @param tagName タグ名
 */
async function createEpisodeData(tagName: string) {
  const episodes = loadAllEpisodes();

  for (let pageNum = 1; ; pageNum++) {
    const pageUrl = `https://omocoro.jp/tag/${encodeURIComponent(
      tagName
    )}/page/${pageNum}/`;

    console.log(`\n[ PAGE: ${pageNum} ] ${pageUrl}\n`);

    // 検索結果を取得
    const res = await fetch(pageUrl);
    if (res.status !== 200) {
      console.log("[END]");
      break;
    }

    // HTMLをパース
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    if (!doc) throw new Error("解析エラー");

    console.log("[OK] パース完了");

    // 記事へのリンクを抽出
    const articles = doc
      .getElementsByClassName("title")
      .map((e) => ({
        title: e.textContent,
        url: e.getElementsByTagName("a")[0]?.getAttribute("href") || "",
      }))
      .filter(({ url }) => url !== "");

    if (articles.length === 0) {
      console.log("[END]");
      break;
    }

    console.log(`[OK] 記事リンク抽出完了 (${articles.length} 件)`);

    for (const { title, url } of articles) {
      // 重複するならスキップ
      if (episodes.find((e) => e.link === url)) {
        console.log(`[SKIP] 既に登録済みです (${title})`);
        continue;
      }

      console.log("-".repeat(30));
      const ok = await addEpisode(url, true);

      // 5秒待つ
      if (ok) await wait(5);
    }

    await wait(2);
  }
}

const radioList: Radio[] = JSON.parse(
  Deno.readTextFileSync("./docs/list.json")
);

for (const { tag } of radioList) {
  await createEpisodeData(tag);
}

console.log("[SUCCESS]");
