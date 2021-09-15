// deno-lint-ignore-file camelcase
import { deserializeFeed } from "https://deno.land/x/rss@0.5.3/mod.ts";
import { fetchRadioUrl } from "./fetchRadioUrl.ts";

const res = await fetch("https://omocoro.jp/feed");
const xml = await res.text();
const { feed } = await deserializeFeed(xml, { outputJsonFeed: true });

for (const { title, external_url } of feed.items) {
  // ラジオ以外ならスキップ
  if (!title || !external_url || !external_url.includes("radio")) continue;

  const radioUrl = await fetchRadioUrl(external_url);

  console.log(title, radioUrl);
}
