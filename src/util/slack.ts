/**
 * Slackへ通知を送信
 * @param title タイトル
 * @param text テキスト
 */
export async function sendSlack(title: "Info" | "Error", text: string) {
  const webhook = Deno.env.get("SLACK_WEBHOOK_URL");
  if (!webhook) {
    throw new Error("Unable to retrieve webhook URL");
  }

  const payload = {
    "attachments": [
      {
        fallback: text,
        color: title === "Info" ? "#89C3EB" : "#E5461C",
        fields: [
          {
            title,
            value: text,
            short: false,
          },
        ],
      },
    ],
  };

  const res = await fetch(webhook, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to send notification (${res.status}: ${res.statusText})`,
    );
  }
}
