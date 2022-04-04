import { Radio } from "../types/radio.ts";
import { crypto } from "../deps.ts";

/**
 * ラジオIDを取得
 * @param radioTitle ラジオ名
 * @param source 音源URL
 * @returns ID
 */
export function getId(radioTitle: string, source: string) {
  // NOTE: ゆるして
  const specialList = new Map([
    ["ありっちゃありアワー", "ariari"],
    ["たかや・マンスーンのパクｐ", "pakupaku"],
  ]);
  if (specialList.has(radioTitle)) return specialList.get(radioTitle);

  const radioList: Radio[] = JSON.parse(
    Deno.readTextFileSync("./docs/list.json")
  );

  // 音源URLから抽出
  const newId = source?.match(/radio\/(.+?)\//)?.[1];
  if (!newId) {
    throw new Error(`ラジオIDの取得に失敗しました (${source})`);
  }

  // リスト内にIDがあればそれを返す
  const foundId = radioList.find(({ title }) => title === radioTitle);
  if (foundId) {
    console.log(`[FOUND] IDが見つかりました (${foundId.id})`);
    return foundId.id;
  }

  // IDの重複を確認
  const result = radioList.find(({ id }) => id === newId);
  if (!result) {
    console.log(`[CREATE] URLからIDを作成しました (${newId})`);
    return newId;
  }

  // 重複する場合、一意なIDを生成
  console.log(`[CREATE] ランダムなIDを作成しました ('${radioTitle}')`);
  return `${newId}-${crypto.randomUUID()}`;
}
