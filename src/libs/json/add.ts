import type { Episode } from "../../types/episode.ts";

import { fetchEpisodeInfo } from "./fetch.ts";

/**
 * 新しいエピソードを追加
 * @param url 記事URL
 * @returns 追加先のラジオID
 */
export async function addEpisode(url: string): Promise<string | undefined> {
  // ラジオ以外の記事ならスキップ
  if (!/radio|rensai/.test(url)) {
    console.log(`[SKIP] ラジオの記事ではありません (${url})`);
    return undefined;
  }

  // 詳細を取得
  const episodeInfo = await fetchEpisodeInfo(url);
  if (!episodeInfo) return undefined;

  const { id, episodeTitle, episodeNumber, desc, pubDate, source } =
    episodeInfo;

  // エピソードデータ読み込み
  const episodeJsonPath = `./docs/json/${id}.json`;
  const episodes: Episode[] = JSON.parse(
    Deno.readTextFileSync(episodeJsonPath)
  );

  const newEpisode: Episode = {
    title: episodeTitle,
    number: episodeNumber ?? episodes.slice(-1)[0].number + 1,
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

  if (isDuplicate) {
    console.log(`[SKIP] 重複したエピソードです (${newEpisode.title})`);
    return undefined;
  }

  // 追加して保存
  episodes.push(newEpisode);

  const results = episodes.sort((a, b) => a.number - b.number);
  Deno.writeTextFileSync(episodeJsonPath, JSON.stringify(results, null, "\t"));

  console.info(`[ADDED] ${id}.json`);
  return id;
}
