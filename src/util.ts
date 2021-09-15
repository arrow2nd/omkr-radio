/**
 * 記事ページから音源のURLを取得
 *
 * @param url 記事のURL
 * @returns 音源ファイルのURL（radio 以下）
 */
export async function fetchRadioUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const html = await res.text();

  const matched = html.match(
    /https:\/\/omocoro\.heteml\.net\/radio\/(.*?\.mp3)/,
  );

  return matched ? matched[1] : "";
}

/**
 * タイトルから話数を抽出
 *
 * @param title タイトル
 * @param name ラジオ名
 * @returns 話数
 */
export function extractNumFromTitle(
  title: string,
  name: string,
): number | undefined {
  const list = [`【\(\\d\+\)】${name}`, `${name}\(\\d\+\)`];

  for (const numRegExp of list) {
    const matched = title.match(numRegExp);
    if (matched) return parseFloat(matched[1]);
  }

  return undefined;
}

/**
 * タイトルからラジオ名を抽出
 *
 * @param title タイトル
 * @returns ラジオ名
 */
export function extractRadioNameFromTitle(title: string): string | undefined {
  const list = [
    /^【\d+】(.*)「/,
    /^(.*?)\d+「/,
    /」(.*)$/,
  ];

  for (const nameRegExp of list) {
    const matched = title.match(nameRegExp);
    if (matched) return matched[1].trim();
  }

  return undefined;
}
