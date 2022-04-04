type ParseTitleResult = {
  radioTitle?: string;
  episodeTitle: string;
  episodeNumber?: number;
};

/**
 * タイトルをパース
 * @param title タイトル
 * @returns 結果
 */
export function parseTitle(title: string): ParseTitleResult | undefined {
  const titleRegExpList = [
    /【(?<no>[\d.]+)】\s*(?<rTitle>.+)\s*「(?<eTitle>.+)」/,
    /【(?<no>[\d.]+)】\s*「(?<eTitle>.+)」\s*(?<rTitle>.+)/,
    /(?<rTitle>[^0-9]+)\s*(?<no>[\d.]+)\s*「(?<eTitle>.+)」/,
  ];

  // ラジオタイトル・エピソード数を抽出
  for (const regExp of titleRegExpList) {
    const result = title.match(regExp);
    if (!result || !result.groups?.eTitle) continue;

    return {
      radioTitle: result.groups?.rTitle,
      episodeTitle: result.groups?.eTitle,
      episodeNumber: result.groups?.no
        ? parseFloat(result.groups.no)
        : undefined,
    };
  }

  return undefined;
}
