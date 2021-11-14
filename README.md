# omkr-radio

[![UpdateData](https://github.com/arrow2nd/omkr-radio/actions/workflows/updateData.yaml/badge.svg)](https://github.com/arrow2nd/omkr-radio/actions/workflows/updateData.yaml)

オモコロで配信されている Web ラジオのデータライブラリ的なもの（自動更新）

> [匿名 Player++](https://github.com/arrow2nd/tokumei-player-pp) で使ってます

## メモ

### ラジオ名一覧

> https://omkr-radio.deno.dev/list

```json
[
  {
    "name": "ARuFa・恐山の匿名ラジオ",
    "tag": "匿名ラジオ",
    "onAir": true
  }
]
```

| プロパティ | 説明           |
| ---------- | -------------- |
| name       | ラジオ名       |
| tag        | 検索用タグ名   |
| onAir      | 更新中かどうか |

### エピソード一覧

> https://omkr-radio.deno.dev/data/{ラジオ名}

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

| プロパティ      | 説明                 |
| --------------- | -------------------- |
| name            | ラジオ名             |
| updated         | 最終更新日（UTC）    |
| episodes        | エピソード           |
| episodes.title  | エピソード名         |
| episodes.number | エピソード数（話数） |
| episodes.path   | 音声ファイルのパス   |
