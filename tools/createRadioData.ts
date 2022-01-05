import type { Episode, ListItem, RadioData } from "../src/type.ts";

import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.14-alpha/deno-dom-wasm.ts";
import { fetchRadioFilePath } from "../src/util/fetchRadioUrl.ts";
import { parseTitle } from "../src/util/parseTitle.ts";

async function createRadioData(
  radioId: string,
  radioName: string,
  tagName: string,
) {
  const episodes: Episode[] = [];

  for (let pageNum = 1;; pageNum++) {
    console.log(`< page = ${pageNum} >`);

    const res = await fetch(
      `https://omocoro.jp/tag/${decodeURIComponent(tagName)}/page/${pageNum}/`,
    );
    if (res.status !== 200) {
      console.log("[END]");
      break;
    }

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    if (!doc) throw new Error("解析エラー");

    const data = doc.getElementsByClassName("title").map((e) => {
      const href = e.getElementsByTagName("a")[0]?.getAttribute("href") || "";
      return {
        title: e.innerText,
        url: href,
      };
    });

    console.log(data);

    for (const { title, url } of data) {
      // ラジオの記事ではないならスキップ
      if (!/^https:\/\/omocoro.jp\/(radio|rensai)/.test(url)) continue;

      // タイトル名から話数を抽出
      const [episodeName, episodeNum] = parseTitle(title, radioName);
      if (!episodeNum) {
        console.log(`[NOT FOUND] ${title}`);
        continue;
      }

      // 音源ファイルのパスを取得
      const radioFilePath = await fetchRadioFilePath(url);
      if (!radioFilePath) continue;

      console.log(`[GET] ${episodeNum} ${radioFilePath}`);

      // 2秒待つ
      await new Promise((resolve) => setTimeout(resolve, 2000));

      episodes.push({
        title: episodeName,
        number: episodeNum,
        path: radioFilePath,
      });
    }
  }

  const results: RadioData = {
    name: radioName,
    updated: new Date().toUTCString(),
    episodes: episodes.sort((a, b) => a.number - b.number), // 昇順でソート
  };

  console.log(results);

  Deno.writeTextFileSync(
    `./docs/data/${radioId}.json`,
    JSON.stringify(results, null, "\t"),
  );
}

const radioList: ListItem[] = JSON.parse(
  Deno.readTextFileSync("./docs/list.json"),
);

for (const radio of radioList) {
  await createRadioData(radio.id, radio.name, radio.tag);
}

console.log("[ SUCCESS!! ]");
