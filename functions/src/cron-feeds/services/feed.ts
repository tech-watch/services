import * as Parser from 'rss-parser';

const parser = new Parser();

export const getFeedsOfLastHours = async (feedsUrls: string[], hours: number): Promise<({ [key: string]: string; } & Parser.Item)[]> => {
  const limitDate = new Date().getTime() - (hours * 1000 * 60 * 60);

  const feedsBySource = await Promise.all(feedsUrls.map(async (url) => {
    const feed = await parser.parseURL(url);
    return feed.items
      .filter((i) => i.pubDate && new Date(i.pubDate).getTime() > limitDate);
  }));

  return feedsBySource.flat();
};
