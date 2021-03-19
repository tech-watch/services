const { createCard } = require('./services/trello');
const { getFeedsOfLastHours } = require('./services/feed');

const handler = async () => {
  const { FEEDS_URLS: feedsUrls } = process.env;
  const feeds = await getFeedsOfLastHours(
    feedsUrls.split(','),
    parseInt(process.env.RATE_IN_HOURS, 10),
  );

  const itemsToAdd = feeds
    .map((i) => createCard(process.env.TRELLO_ID_LIST, {
      name: i.title && i.title.replace(/(\r\n|\n|\r)/gm, ''),
      desc: i.description && i.description.replace(/(\r\n|\n|\r)/gm, ''),
      urlSource: i.link,
    }));

  return Promise.all(itemsToAdd);
};

module.exports = {
  handler,
};
