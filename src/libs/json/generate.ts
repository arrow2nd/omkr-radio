import type { Episode } from "@/types/json.ts";
import type { FetchResult } from "@/libs/json/fetch.ts";

import { addRadio } from "@/libs/json/add.ts";

/**
 * 新規ラジオデータを生成
 * @param episodeInfo エピソード情報
 */
export function generateNewRadio(episodeInfo: FetchResult) {
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
    url,
  } = episodeInfo;

  const radioId = id;
  if (!radioId) {
    throw new Error("ラジオIDの自動生成に失敗しました。");
  }

  // 新規ラジオを追加
  addRadio({
    id: radioId,
    title: radioTitle,
    tag: tagName,
    author,
    desc,
    thumbnail,
    link: tagLink,
    nowOnAir: true,
  });

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
      link: url,
      pubDate,
    },
  ];

  Deno.writeTextFileSync(
    episodeJsonPath,
    JSON.stringify(newEpisodeJson, null, "\t"),
  );

  console.log(`[OK] 「${radioTitle}」を新規登録しました`);
}
