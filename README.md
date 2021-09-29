# omkr-radio

[![UpdateData](https://github.com/arrow2nd/omkr-radio/actions/workflows/updateData.yaml/badge.svg)](https://github.com/arrow2nd/omkr-radio/actions/workflows/updateData.yaml)

オモコロで配信されている Web ラジオのデータベース的なもの（自動更新）

## メモ

### ラジオ一覧

> https://arrow2nd.github.io/omkr-radio/list.json

```json
[
  {
    "name": "ARuFa・恐山の匿名ラジオ",
    "tag": "匿名ラジオ",
    "onAir": true
  }
]
```

| プロパティ | 説明      |
| ----- | ------- |
| name  | ラジオ名    |
| tag   | 検索用タグ名  |
| onAir | 更新中かどうか |

### エピソード一覧

> https://arrow2nd.github.io/omkr-radio/data/{ラジオ名}.json

```json
{
  "name": "ARuFa・恐山の匿名ラジオ",
  "updated": "2021-09-29T08:36:47.532Z",
  "episodes": [
    {
      "title": "キックボード",
      "number": 1,
      "path": "tokumei/001.mp3"
    }
  ]
}
```

| プロパティ             | 説明         |
| ----------------- | ---------- |
| name              | ラジオ名       |
| updated           | 最終更新日（UTC） |
| episodes          | エピソード      |
| episodes / title  | エピソード名     |
| episodes / number | エピソード数（話数） |
| episodes / path   | 音声ファイルのパス  |
