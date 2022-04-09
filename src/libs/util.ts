/**
 * 指定秒数間待機
 * @param sec 秒数
 */
export async function wait(sec: number) {
  await new Promise((resolve) => setTimeout(resolve, sec * 1000));
}
