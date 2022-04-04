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
