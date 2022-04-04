import { Radio } from "../types/radio.ts";
import { crypto } from "../deps.ts";

const radioList: Radio[] = JSON.parse(
  Deno.readTextFileSync("./docs/list.json")
);

/**
 * ラジオIDを取得
 * @param source 音源URL
 * @returns ID
 */
export function getId(source: string) {
  const newId = source?.match(/radio\/(.+?)\//)?.[1];

  if (!newId) {
    throw new Error(`ラジオIDの取得に失敗しました (${source})`);
  }

  // IDの重複を確認
  const result = radioList.find(({ id }) => id === newId);
  if (!result) return newId;

  // 重複する場合、一意なIDを生成
  return `${newId}-${crypto.randomUUID()}`;
}
