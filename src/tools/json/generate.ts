import type { Radio } from "../../types/radio.ts";
import type { Episode } from "../../types/episode.ts";

import { fetchEpisodeInfo } from "../../libs/json/fetch.ts";

/**
 * 新規ラジオデータを生成
 * @param pageUrl ラジオの記事ページURL
 */
async function generateNewRadio(pageUrl: string) {
  // リスト読み込み
  const listPath = "./docs/list.json";
  const radioList: Radio[] = JSON.parse(Deno.readTextFileSync(listPath));

  // 詳細を取得
  const episodeInfo = await fetchEpisodeInfo(pageUrl);
  if (!episodeInfo) {
    throw new Error("音源ファイルが見つかりませんでした");
  }

  const {
    id,
    radioTitle,
    tagName,
    tagLink,
    episodeTitle,
    episodeNumber,
    desc,
    pubDate,
    author,
    thumbnail,
    source,
  } = episodeInfo;

  const radioId = id;
  if (!radioId) {
    throw new Error("ラジオIDの自動生成に失敗しました。");
  }

  // 新規ラジオを追加
  radioList.push({
    id: radioId,
    title: radioTitle,
    tag: tagName,
    author,
    desc,
    thumbnail,
    link: tagLink,
    nowOnAir: true,
  });

  // 五十音順（あ->ア->亜）でソート
  radioList.sort((a, b) => a.title.localeCompare(b.title, "ja"));

  // リストを更新
  Deno.writeTextFileSync(listPath, JSON.stringify(radioList, null, "\t"));

  // エピソードファイルを作成
  const episodeJsonPath = `./docs/json/${id}.json`;
  Deno.createSync(episodeJsonPath);

  // データを作成して保存
  const newEpisodeJson: Episode[] = [
    {
      title: episodeTitle,
      number: episodeNumber || 1,
      desc,
      source,
      link: pageUrl,
      pubDate,
    },
  ];

  Deno.writeTextFileSync(
    episodeJsonPath,
    JSON.stringify(newEpisodeJson, null, "\t")
  );
}

// CLI
if (Deno.args.length === 1) {
  generateNewRadio(Deno.args[0]);
}
