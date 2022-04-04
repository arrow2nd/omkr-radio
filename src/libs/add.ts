import type { Episode } from "../types/episode.ts";

import { fetchEpisodeInfo } from "./fetch.ts";

/**
 * 新しいエピソードを追加
 * @param url 記事URL
 */
export async function addEpisode(url: string) {
  // ラジオ以外の記事ならスキップ
  if (!url.includes("radio")) return;

  // 詳細を取得
  const episodeInfo = await fetchEpisodeInfo(url);
  if (!episodeInfo) {
    console.log("[SKIP] 音源ファイルがありません");
    return;
  }

  const { id, episodeTitle, episodeNumber, desc, pubDate, source } =
    episodeInfo;

  // エピソードデータ読み込み
  const episodeJsonPath = `./docs/json/${id}.json`;
  const episodes: Episode[] = JSON.parse(
    Deno.readTextFileSync(episodeJsonPath)
  );

  const newEpisode: Episode = {
    title: episodeTitle,
    number: episodeNumber || episodes.slice(-1)[0].number + 1,
    desc,
    source,
    link: url,
    pubDate,
  };

  // 重複確認
  const isDuplicate = episodes.some(
    (e) =>
      e.title === newEpisode.title &&
      e.number === newEpisode.number &&
      e.source === newEpisode.source
  );

  if (isDuplicate) return;

  // 追加して保存
  episodes.push(newEpisode);

  const results = episodes.sort((a, b) => a.number - b.number);
  Deno.writeTextFileSync(episodeJsonPath, JSON.stringify(results, null, "\t"));

  console.info("[ADDED]");
}
