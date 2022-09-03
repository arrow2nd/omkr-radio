/**
 * 指定秒数間待機
 * @param sec 秒数
 */
export async function wait(sec: number) {
  await new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

/**
 * GETする（5秒でタイムアウト）
 * @param url URL
 * @returns レスポンス
 */
export async function fetchWithTimeout(url: string): Promise<Response> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), 5000);

  const res = await fetch(url, {
    signal: ctrl.signal,
    headers: {
      "User-Agent": "omkr-radio Crawler (contact@arrow2nd.com)",
    },
  });

  clearTimeout(id);

  return res;
}
