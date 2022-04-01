# omkr-radio

オモコロで配信されている Web ラジオをまとめた JSON ファイル（ほぼ自動更新）

[![update](https://github.com/arrow2nd/omkr-radio/actions/workflows/update.yaml/badge.svg)](https://github.com/arrow2nd/omkr-radio/actions/workflows/update.yaml)
[![Deno](https://shields.io/badge/deno-%5E1.20-green?logo=deno&style=flat)](https://deno.land)
[![GitHub license](https://img.shields.io/github/license/arrow2nd/omkr-radio)](https://github.com/arrow2nd/omkr-radio/blob/main/LICENSE)

## データ形式

### ラジオ一覧

オモコロで現在視聴可能なラジオの一覧です。

URL: `https://arrow2nd.github.io/omkr-radio/list.json`

```json
[
  {
    "id": "tokumei",
    "name": "ARuFa・恐山の匿名ラジオ",
    "tag": "匿名ラジオ",
    "onAir": true
  }
]
```

| プロパティ | 型      | 説明           |
| ---------- | ------- | -------------- |
| id         | String  | ラジオ ID      |
| name       | String  | ラジオ名       |
| tag        | String  | 検索用タグ名   |
| onAir      | Boolean | 更新中かどうか |

### エピソード一覧

それぞれのラジオのエピソードの一覧です。

URL: `https://arrow2nd.github.io/omkr-radio/data/{ラジオID}.json`

```json
{
  "name": "ARuFa・恐山の匿名ラジオ",
  "updated": "Fri, 19 Nov 2021 10:45:06 GMT",
  "episodes": [
    {
      "title": "キックボード",
      "number": 1,
      "path": "tokumei/001.mp3"
    }
  ]
}
```

| プロパティ | 型      | 説明              |
| ---------- | ------- | ----------------- |
| name       | String  | ラジオ名          |
| updated    | String  | 最終更新日（UTC） |
| episodes   | Episode | エピソード配列    |

### Episode

| プロパティ | 型     | 説明                                                            |
| ---------- | ------ | --------------------------------------------------------------- |
| title      | String | タイトル                                                        |
| number     | Number | 話数                                                            |
| path       | String | 音源のパス<br>（`https://omocoro.heteml.net/radio/`以下の部分） |

## 実行

```sh
# エピソードを自動更新
deno task update

# 新規ラジオを追加（対話形式）
deno task cli
```
