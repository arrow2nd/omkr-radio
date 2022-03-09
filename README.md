# omkr-radio

オモコロで配信されている Web ラジオをまとめた JSON ファイル（ほぼ自動更新）

[![AutoUpdate](https://github.com/arrow2nd/omkr-radio/actions/workflows/auto-update.yaml/badge.svg)](https://github.com/arrow2nd/omkr-radio/actions/workflows/auto-update.yaml)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)
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
| id         | string  | ラジオ ID      |
| name       | string  | ラジオ名       |
| tag        | string  | 検索用タグ名   |
| onAir      | boolean | 更新中かどうか |

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

| プロパティ         | 説明                                                            |
| ------------------ | --------------------------------------------------------------- |
| name               | ラジオ名                                                        |
| updated            | 最終更新日（UTC）                                               |
| episodes           | エピソード配列                                                  |
| episodes[0].title  | タイトル                                                        |
| episodes[0].number | 話数                                                            |
| episodes[0].path   | 音源のパス<br>（`https://omocoro.heteml.net/radio/`以下の部分） |
