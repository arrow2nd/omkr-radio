/**
 * タイトルテキストをパース
 * @param title タイトル
 * @param radioName ラジオ名
 * @returns [エピソード名, 話数]
 */
export function parseTitle(
  title: string,
  radioName: string,
): [string, number | undefined] {
  const matchedName = title.match(/「(.+)」/);
  const episodeName = matchedName?.[1] || title;

  const numRegExpList = [
    `【\(\\d\+\)】\\s\*${radioName}\\s\*「`,
    `【\(\\d\+\)】\.\*${radioName}\$`,
    `${radioName}\\s\*\(\\d\+\)`,
  ];

  for (const regExp of numRegExpList) {
    const matchedNum = title.match(regExp);
    if (matchedNum) {
      return [episodeName, parseFloat(matchedNum[1])];
    }
  }

  return [episodeName, undefined];
}
