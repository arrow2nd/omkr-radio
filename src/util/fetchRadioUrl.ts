/**
 * 記事ページから音源ファイルのパスを抽出
 *
 * @param url 記事のURL
 * @returns 音源ファイルまでのパス（radio 以下）
 */
export async function fetchRadioFilePath(url: string): Promise<string> {
  const res = await fetch(url);
  const html = await res.text();

  const matched = html.match(
    /https:\/\/omocoro\.heteml\.net\/radio\/(.*?\.mp3)/
  );

  return matched ? matched[1] : "";
}
