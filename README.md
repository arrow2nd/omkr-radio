# omkr-radio

オモコロで配信されている Web ラジオのデータライブラリ的なもの（ほぼ自動更新）

[![UpdateData](https://github.com/arrow2nd/omkr-radio/actions/workflows/updateData.yaml/badge.svg)](https://github.com/arrow2nd/omkr-radio/actions/workflows/updateData.yaml)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)
[![GitHub license](https://img.shields.io/github/license/arrow2nd/omkr-radio)](https://github.com/arrow2nd/omkr-radio/blob/main/LICENSE)

## メモ

### ラジオ名一覧

> https://arrow2nd.github.io/omkr-radio/list.json

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

| プロパティ | 説明           |
| ---------- | -------------- |
| id         | ラジオ ID      |
| name       | ラジオ名       |
| tag        | 検索用タグ名   |
| onAir      | 更新中かどうか |

### エピソード一覧

> https://arrow2nd.github.io/omkr-radio/data/{ラジオID}.json

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

| プロパティ      | 説明                                                          |
| --------------- | ------------------------------------------------------------- |
| name            | ラジオ名                                                      |
| updated         | 最終更新日（UTC）                                             |
| episodes        | エピソード                                                    |
| episodes.title  | エピソード名                                                  |
| episodes.number | エピソード数（話数）                                          |
| episodes.path   | 音源ファイルのパス（`https://omocoro.heteml.net/radio/`以下） |
