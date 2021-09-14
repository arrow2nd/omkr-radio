// deno-lint-ignore-file
import { deserializeFeed } from "https://deno.land/x/rss@0.5.3/mod.ts";

const response = await fetch("https://omocoro.jp/feed");
const xml = await response.text();
const { feed } = await deserializeFeed(xml, { outputJsonFeed: true });

for (const { title, external_url } of feed.items) {
  // ラジオ以外ならスキップ
  if (!title || !external_url || !external_url.includes("radio")) continue;

  const res = await fetch(external_url);
  const html = await res.text();

  // 音声ファイルのURLを抽出
  const matched = html.match(/https:\/\/omocoro\.heteml\.net.*\.mp3/);
  if (!matched) continue;

  const radioUrl = matched[0];
  console.log(title, radioUrl);
}
