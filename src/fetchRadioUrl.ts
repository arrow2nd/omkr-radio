export async function fetchRadioUrl(url: string) {
  const res = await fetch(url);
  const html = await res.text();

  // 音声ファイルのURLを抽出
  const matched = html.match(
    /https:\/\/omocoro\.heteml\.net\/radio\/(.*?\.mp3)/,
  );
  if (!matched) return "";

  return matched[1];
}
