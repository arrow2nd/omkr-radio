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
    /#(?<no>\d+)「(?<eTitle>.+?)」(?<rTitle>.+)/,
    /第(?<no>[\d]+)回\s*(?<rTitle>.+?)\s*「(?<eTitle>.+)」/,
    /【(?<no>[\d.]+)】\s*(?<rTitle>.+?)\s*「(?<eTitle>.+)」/,
    /【(?<no>[\d.]+)】\s*「(?<eTitle>.+?)」\s*(?<rTitle>.+)/,
    /(?<rTitle>[^0-9]+)\s*(?<no>[\d.]+)\s*「(?<eTitle>.+)」/,
  ];

  // ラジオタイトル・エピソード数を抽出
  for (const regExp of titleRegExpList) {
    const result = title.match(regExp);
    if (!result || !result.groups?.eTitle) continue;

    return {
      radioTitle: result.groups?.rTitle.trim(),
      episodeTitle: result.groups?.eTitle.trim(),
      episodeNumber: result.groups?.no
        ? parseFloat(result.groups.no)
        : undefined,
    };
  }

  return undefined;
}

/**
 * 日付文字列をパース
 * @param dateStr 日付文字列
 * @returns UTCの日付文字列
 */
export function parseDate(dateStr: string) {
  const date = dateStr.split("-").map((e) => parseInt(e));
  return new Date(date[0], date[1] - 1, date[2]).toUTCString();
}
