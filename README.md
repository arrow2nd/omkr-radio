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
    "title": "ARuFa・恐山の匿名ラジオ",
    "tag": "匿名ラジオ",
    "author": "ARuFa,ダ・ヴィンチ・恐山",
    "desc": "たぶん毎週木曜日に更新されますので、よろしくお願いします。",
    "thumbnail": "https://omocoro.jp/assets/uploads/ogp_tokumeiradio_01.png",
    "link": "https://omocoro.jp/tag/%23%E3%83%A9%E3%82%B8%E3%82%AA",
    "nowOnAir": true
  }
]
```

| プロパティ | 型      | 説明                   |
| ---------- | ------- | ---------------------- |
| id         | String  | ラジオ ID              |
| title      | String  | ラジオ名               |
| tag        | String  | 検索用タグ名           |
| author     | String  | 出演者（カンマ区切り） |
| desc       | String  | 概要                   |
| thumbnail  | String  | サムネイル画像 URL     |
| link       | String  | タグページのリンク     |
| onAir      | Boolean | 更新中かどうか         |

### エピソード一覧

それぞれのラジオのエピソードの一覧です。

URL: `https://arrow2nd.github.io/omkr-radio/json/{ラジオID}.json`

```json
[
  {
    "title": "キックボード",
    "number": 1,
    "desc": "たぶん毎週木曜日に更新されますので、よろしくお願いします。",
    "source": "https://omocoro.heteml.net/radio/tokumei/001.mp3",
    "link": "https://omocoro.jp/rensai/84585/",
    "pubDate": "Mon, 22 Aug 2016 15:00:00 GMT"
  }
]
```

| プロパティ | 型     | 説明     |
| ---------- | ------ | -------- |
| title      | String | タイトル |
| number     | Number | 話数     |
| desc       | String | 概要     |
| source     | String | 音源 URL |
| link       | String | 記事 URL |
| pubDate    | String | 公開日時 |

## 実行

```sh
# エピソードを自動更新
deno task update

# 新規ラジオを追加（対話形式）
deno task cli
```
