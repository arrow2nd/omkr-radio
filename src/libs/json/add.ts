import type { Episode, Radio } from "@/types/json.ts";

import { fetchEpisodeInfo } from "@/libs/json/fetch.ts";

type AddEpisodeResult = {
  id: string;
  episodes: Episode[];
};

/**
 * 新しいエピソードを追加
 * @param url 記事URL
 * @param enableRensai 旧ラジオのURLを読むか
 * @returns 結果
 */
export async function addEpisode(
  url: string,
  enableRensai: boolean,
): Promise<AddEpisodeResult | undefined> {
  const urlRegExp = new RegExp(
    `https://omocoro.jp/\(radio${enableRensai ? "|rensai" : ""}\)/`,
  );

  // ラジオ以外の記事ならスキップ
  if (!urlRegExp.test(url)) {
    console.log(`[SKIP] ラジオの記事ではありません (${url})`);
    return;
  }

  // 詳細を取得
  const episodeInfo = await fetchEpisodeInfo(url);
  if (!episodeInfo) return;

  const { id, episodeTitle, episodeNumber, desc, pubDate, source } =
    episodeInfo;

  if (!id) {
    throw new Error("ラジオIDがありません");
  }

  // エピソードデータ読み込み
  const episodeJsonPath = `./docs/json/${id}.json`;
  const episodes: Episode[] = JSON.parse(
    Deno.readTextFileSync(episodeJsonPath),
  );

  const newEpisode: Episode = {
    title: episodeTitle,
    number: episodeNumber ?? episodes.slice(-1)[0].number + 1,
    desc,
    source,
    link: url,
    pubDate,
  };

  const duplicateIndex = episodes.findIndex(
    (e) => e.title === newEpisode.title,
  );

  if (duplicateIndex !== -1) {
    // 重複したデータが既にあれば、新しいものに更新
    episodes[duplicateIndex] = newEpisode;
    console.log(`[UPDATED] ${id}.json (${newEpisode.title})`);
  } else {
    // 追加して保存
    episodes.push(newEpisode);
    console.info(`[ADDED] ${id}.json`);
  }

  const results = episodes.sort((a, b) => a.number - b.number);
  Deno.writeTextFileSync(episodeJsonPath, JSON.stringify(results, null, "\t"));

  return {
    id,
    episodes: results,
  };
}

/**
 * 新しいラジオを追加
 * @param radio ラジオデータ
 */
export function addRadio(radio: Radio) {
  // リスト読み込み
  const listPath = "./docs/list.json";
  const radioList: Radio[] = JSON.parse(Deno.readTextFileSync(listPath));

  radioList.push(radio);

  // 五十音順（あ->ア->亜）でソート
  radioList.sort((a, b) => a.title.localeCompare(b.title, "ja"));

  // リストを更新
  Deno.writeTextFileSync(listPath, JSON.stringify(radioList, null, "\t"));
}
