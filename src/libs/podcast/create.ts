import { stringify } from "xml";

import type { Episode, Radio } from "@/types/json.ts";
import type { Item, PodcastXml } from "@/types/podcast.ts";

/**
 * ポッドキャスト用XMLを作成
 * @param radio ラジオデータ
 * @param episodes エピソードデータ
 * @returns XML
 */
export function createPodcastXml(radio: Radio, episodes: Episode[]): string {
  const items: Item[] = episodes.map(
    ({ title, desc, pubDate, source, link }) => ({
      title,
      description: desc,
      pubDate,
      enclosure: { "@url": source, "@type": "audio/mpeg" },
      link,
    }),
  );

  const { title, author, desc, thumbnail, link } = radio;
  const xml: PodcastXml = {
    rss: {
      "@version": "2.0",
      "@xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
      channel: {
        title,
        "itunes:author": author.replace(/,/g, " / "),
        description: desc,
        "itunes:image": {
          "@href": thumbnail,
        },
        language: "ja",
        link,
        item: items.reverse(),
      },
    },
  };

  return stringify(xml);
}
