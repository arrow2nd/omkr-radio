import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.14-alpha/deno-dom-wasm.ts";
import { Episode, RadioData } from "../type.ts";

//------------------------------------------------
const radioId = "sebunagata";
const radioName = "セブ山・永田の金曜ラジオ";
const numRegExp = `${radioName}！\?\(\\d\+\)`;
const baseUrl = "https://omocoro.jp/rensai/45480/";
//------------------------------------------------

const episodes: Episode[] = [];

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
      title: e.innerText,
      path: href,
    };
  });

  console.log(p);

  for (const { title, path } of p) {
    const matchedName = title.match(/「(.*)」/);
    const episodeName = matchedName ? matchedName[1] : title;

    const episodeNum = title.match(numRegExp);
    if (!episodeNum) continue;

    const radioFilePath = path.match(
      /https:\/\/omocoro\.heteml\.net\/radio\/(.*?\.mp3)/
    );
    if (!radioFilePath) continue;

    episodes.push({
      title: episodeName,
      number: parseInt(episodeNum[1]),
      path: radioFilePath[1],
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
  JSON.stringify(results, null, "\t")
);
