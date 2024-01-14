# omkr-radio

オモコロで配信されている Web ラジオの非公式 Podcast フィード（ほぼ自動更新）

[![update](https://github.com/arrow2nd/omkr-radio/actions/workflows/update.yaml/badge.svg)](https://github.com/arrow2nd/omkr-radio/actions/workflows/update.yaml)
[![Deno](https://shields.io/badge/deno-%5E1.20-green?logo=deno&style=flat)](https://deno.land)

## JSON

### ラジオ一覧

オモコロで現在視聴可能なラジオの一覧です。

`https://arrow2nd.github.io/omkr-radio/list.json`

#### データ形式

```json
[
  {
    "id": "tokumei",
    "title": "ARuFa・恐山の匿名ラジオ",
    "tag": "匿名ラジオ",
    "author": "ARuFa,ダ・ヴィンチ・恐山",
    "desc": "たぶん毎週木曜日に更新されますので、よろしくお願いします。",
    "thumbnail": "https://omocoro.jp/assets/uploads/ogp_tokumeiradio_01.png",
    "link": "https://omocoro.jp/tag/%E5%8C%BF%E5%90%8D%E3%83%A9%E3%82%B8%E3%82%AA",
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
| nowOnAir   | Boolean | 更新中かどうか         |

### エピソード一覧

それぞれのラジオのエピソードの一覧です。

`https://arrow2nd.github.io/omkr-radio/json/{ラジオID}.json`

#### データ形式

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

## 非公式 Podcast フィード

> [!WARNING] この Podcast フィードは **非公式**
> のものであり、[オモコロ](https://omocoro.jp)
> 及び、[株式会社バーグハンバーグバーグ](https://bhb.co.jp)
> とは一切関係ございません。<br>
> また、予告なく更新・公開を停止する場合があります。

- [Podcast](https://support.apple.com/ja-jp/guide/podcasts/pod970198c2/mac)
  アプリ / [AntennaPod](https://antennapod.org) にて動作検証しています

<!-- podcast list start -->

| ラジオ名                               | Podcast フィード URL                                                                             | 更新中 |
| -------------------------------------- | ------------------------------------------------------------------------------------------------ | ------ |
| ARuFa・恐山の匿名ラジオ                | https://arrow2nd.github.io/omkr-radio/podcast/tokumei.rss                                        | ✅     |
| ありっちゃありスパーク                 | https://arrow2nd.github.io/omkr-radio/podcast/arispa.rss                                         | ❌     |
| ありっちゃありスパーク・マシュ         | https://arrow2nd.github.io/omkr-radio/podcast/arimasyu.rss                                       | ❌     |
| ありっちゃありスパーク・梵             | https://arrow2nd.github.io/omkr-radio/podcast/aribon.rss                                         | ✅     |
| かまってみくのしん                     | https://arrow2nd.github.io/omkr-radio/podcast/kamamicu.rss                                       | ❌     |
| かまってみくのしんGOLD                 | https://arrow2nd.github.io/omkr-radio/podcast/kamamicu-67c13a9f-e468-4bae-992d-3d2b786f15ac.rss  | ❌     |
| かまってみくのしんLove you             | https://arrow2nd.github.io/omkr-radio/podcast/kamamicu-0bc4f3a9-e35b-4887-a215-b92f36efc237.rss  | ❌     |
| かまってみくのしん日本一               | https://arrow2nd.github.io/omkr-radio/podcast/kamamicu-46501532-6287-4ae8-8563-b25161de37c7.rss  | ❌     |
| かまみく                               | https://arrow2nd.github.io/omkr-radio/podcast/kamamicu-97a25752-248b-4645-b52f-fa1f2ba30b63.rss  | ✅     |
| かまみくZ                              | https://arrow2nd.github.io/omkr-radio/podcast/kamamicu-07ba9c29-5528-4705-ad2e-8673bc635d6d.rss  | ❌     |
| シモダ＆イーグルの残念ラジオ           | https://arrow2nd.github.io/omkr-radio/podcast/zannen.rss                                         | ❌     |
| シモダテツヤと私（ヨッピー）           | https://arrow2nd.github.io/omkr-radio/podcast/shimowata-b5fa1358-5fa5-42e2-b56c-24dff757c323.rss | ❌     |
| シモダテツヤと私（地獄のミサワ）       | https://arrow2nd.github.io/omkr-radio/podcast/shimowata.rss                                      | ❌     |
| セブ山・永田の金曜ラジオ               | https://arrow2nd.github.io/omkr-radio/podcast/sebunagata.rss                                     | ❌     |
| そうじゃねえだろのラジオじゃねえだろ！ | https://arrow2nd.github.io/omkr-radio/podcast/soujanee.rss                                       | ❌     |
| ソルジャーラジオ                       | https://arrow2nd.github.io/omkr-radio/podcast/yoropen.rss                                        | ✅     |
| たかや・マンスーンのパクパクラジオ     | https://arrow2nd.github.io/omkr-radio/podcast/pakupaku.rss                                       | ❌     |
| ながみく                               | https://arrow2nd.github.io/omkr-radio/podcast/kamamicu-a2767ed9-1d5b-490b-9ac8-2828eedbfe09.rss  | ❌     |
| ながみく∞                              | https://arrow2nd.github.io/omkr-radio/podcast/kamamicu-91996f23-0cbb-40f4-a6e5-aeb9acb8ad7b.rss  | ❌     |
| ニュース！オモコロウォッチ！           | https://arrow2nd.github.io/omkr-radio/podcast/watch.rss                                          | ✅     |
| マンスーン・ヤスミノの音声放送         | https://arrow2nd.github.io/omkr-radio/podcast/kayouradio.rss                                     | ✅     |
| みくのしん・おおきちの大仲良しラジオ   | https://arrow2nd.github.io/omkr-radio/podcast/dainaka.rss                                        | ❌     |
| ラジオ・モンゴルナイトフィーバー       | https://arrow2nd.github.io/omkr-radio/podcast/mongol.rss                                         | ✅     |
| ラジオ漫画犬血道編                     | https://arrow2nd.github.io/omkr-radio/podcast/maninu-b6b7c76c-8c64-460f-a6f5-b2b734902b8b.rss    | ❌     |
| ラジオ漫画犬漂流編                     | https://arrow2nd.github.io/omkr-radio/podcast/maninu-ceba5239-5bc9-4052-b3ab-d3b2fde866c6.rss    | ❌     |
| ラジオ漫画犬咆哮編                     | https://arrow2nd.github.io/omkr-radio/podcast/maninu-b3234812-6a4e-4b55-9c70-b4d689cca00e.rss    | ✅     |
| 加藤・ギャラクシーのラジオKGB          | https://arrow2nd.github.io/omkr-radio/podcast/kgb.rss                                            | ❌     |
| 原宿・おすしのありっちゃありアワー     | https://arrow2nd.github.io/omkr-radio/podcast/ariari.rss                                         | ❌     |
| 作業用かまみく                         | https://arrow2nd.github.io/omkr-radio/podcast/kamamicu-3cd98256-982c-48e3-84f1-02ab49dbcc21.rss  | ❌     |
| 睡眠用かまみく                         | https://arrow2nd.github.io/omkr-radio/podcast/kamamicu-9d9208ea-e0ac-4f1e-88bf-95d25d359071.rss  | ❌     |
| 長島・加藤のイうてるマにイっちゃってる | https://arrow2nd.github.io/omkr-radio/podcast/itm.rss                                            | ❌     |
| 店長・リックェのフラコト               | https://arrow2nd.github.io/omkr-radio/podcast/flakoto.rss                                        | ❌     |
| 凸ノ・カメントツのラジオ漫画犬         | https://arrow2nd.github.io/omkr-radio/podcast/maninu.rss                                         | ❌     |

<!-- podcast list end -->

## 実行

```sh
# エピソードを自動更新
deno task update

# 新規ラジオを追加（対話形式）
deno task cli
```
