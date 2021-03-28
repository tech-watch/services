const Parser = require('rss-parser');

const parser = new Parser();

const getFeedsOfLastHours = async (feedsUrls, hours) => {
  const limitDate = new Date().getTime() - (hours * 1000 * 60 * 60);

  const feedsBySource = await Promise.all(feedsUrls.map(async (url) => {
    const feed = await parser.parseURL(url);
    return feed.items
      .filter((i) => new Date(i.pubDate).getTime() > limitDate);
  }));

  return feedsBySource.flat();
};

module.exports = {
  getFeedsOfLastHours,
};
