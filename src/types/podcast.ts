export type PodcastXml = {
  rss: {
    "@version": "2.0";
    "@xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd";
    channel: {
      title: string;
      "itunes:author": string;
      description: string;
      "itunes:image": {
        "@href": string;
      };
      language: "ja";
      link: string;
      item: Item[];
    };
  };
};

export type Item = {
  title: string;
  description: string;
  pubDate: string;
  enclosure: {
    "@url": string;
    "@type": "audio/mpeg";
  };
  link: string;
};
