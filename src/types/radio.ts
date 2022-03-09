export type RadioData = {
  /** ラジオ名 */
  name: string;
  /** 更新日時（UTC） */
  updated: string;
  /** エピソード一覧 */
  episodes: Episode[];
};

export type Episode = {
  /** タイトル */
  title: string;
  /** 話数（小数点を含む場合あり） */
  number: number;
  /** 音源のパス（https://omocoro.heteml.net/radio/ 以下） */
  path: string;
};

export type ListItem = {
  /** ラジオID（分類用に独自に決めたもの） */
  id: string;
  /** ラジオ名 */
  name: string;
  /** オモコロでのタグ名 */
  tag: string;
  /** 更新中かどうか */
  onAir: boolean;
};
