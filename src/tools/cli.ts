/**
 * 新規ラジオを追加するCLIツール
 */

import type { ListItem, RadioData } from "../types/radio.ts";

// 値を入力
const id = prompt("ラジオID");
const name = prompt("ラジオ名");
const tag = prompt("タグ名");

if (!id || !name || !tag) {
  console.log("入力された値が不正です");
  Deno.exit(1);
}

const listPath = "./docs/list.json";
const radioList: ListItem[] = JSON.parse(
  Deno.readTextFileSync(listPath),
);

// ラジオリストに追加
radioList.push({
  id,
  name,
  tag,
  onAir: true,
});

// 五十音順（あ->ア->亜）でソート
radioList.sort((a, b) => a.name.localeCompare(b.name, "ja"));
Deno.writeTextFileSync(listPath, JSON.stringify(radioList, null, "\t"));

// ファイルを作成
const radioDataPath = `./docs/data/${id}.json`;
Deno.createSync(radioDataPath);

// データを作成して保存
const newRadioData: RadioData = {
  name,
  updated: new Date().toUTCString(),
  episodes: [],
};

Deno.writeTextFileSync(radioDataPath, JSON.stringify(newRadioData, null, "\t"));
