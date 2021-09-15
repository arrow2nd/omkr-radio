import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.14-alpha/deno-dom-wasm.ts";
import { RadioData, RadioItem } from "../type.ts";

//------------------------------------------------
const radioName = "セブ山・永田の金曜ラジオ";
const tagName = "金曜ラジオ";
const numRegExp = `${radioName}！\?\(\\d\+\)`;
const baseUrl = "https://omocoro.jp/rensai/45480/";
//------------------------------------------------

const items: RadioItem[] = [];

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
      url: href,
    };
  });

  console.log(p);

  for (const { title, url } of p) {
    const matched = title.match(numRegExp);
    if (!matched) continue;

    items.push({
      title,
      num: Number(matched[1]),
      url,
    });
  }
}

const results: RadioData = {
  name: radioName,
  tag: tagName,
  items: items.sort((a, b) => a.num - b.num), // 昇順でソート
};

console.log(results);

Deno.writeTextFileSync(
  `./docs/${radioName}.json`,
  JSON.stringify(results, null, "\t"),
);
