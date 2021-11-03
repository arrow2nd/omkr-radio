import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.14-alpha/deno-dom-wasm.ts";
import { Episode, ListItem, RadioData } from "../type.ts";
import { fetchRadioFilePath } from "../util/fetchRadioUrl.ts";
import { parseTitle } from "../util/parseTitle.ts";

async function createRadioData(radioName: string, tagName: string) {
  const episodes: Episode[] = [];

  for (let pageNum = 1; ; pageNum++) {
    console.log(`< page = ${pageNum} >`);

    const res = await fetch(
      `https://omocoro.jp/tag/${decodeURIComponent(tagName)}/page/${pageNum}/`
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
      // ラジオではない
      if (!/^https:\/\/omocoro.jp\/(radio|rensai)/.test(url)) continue;

      // タイトルから話数を抽出
      const [episodeName, episodeNum] = parseTitle(title, radioName);
      if (!episodeNum) {
        console.log(`[NOT FOUND] ${title}`);
        continue;
      }

      // 音声ファイルのパスを取得
      const radioFilePath = await fetchRadioFilePath(url);
      if (radioFilePath === "") continue;

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
    updated: new Date(),
    episodes: episodes.sort((a, b) => a.number - b.number), // 昇順でソート
  };

  console.log(results);

  Deno.writeTextFileSync(
    `./public/data/${radioName}.json`,
    JSON.stringify(results, null, "\t")
  );
}

const radioList: ListItem[] = JSON.parse(
  Deno.readTextFileSync("./public/list.json")
);

for (const radio of radioList) {
  await createRadioData(radio.name, radio.tag);
}

console.log("[ SUCCESS!! ]");
