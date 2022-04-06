export type Radio = {
  /** ラジオID（分類用に独自に決めたもの） */
  id: string;
  /** ラジオタイトル */
  title: string;
  /** オモコロでのタグ名 */
  tag: string;
  /** 出演者 */
  author: string;
  /** 概要 */
  desc: string;
  /** サムネイル画像のパス */
  thumbnail: string;
  /** リンク */
  link: string;
  /** 更新中かどうか */
  nowOnAir: boolean;
};

export type Episode = {
  /** タイトル */
  title: string;
  /** エピソード数 */
  number: number;
  /** 概要 */
  desc: string;
  /** 音源 */
  source: string;
  /** リンク */
  link: string;
  /** 配信日 */
  pubDate: string;
};
