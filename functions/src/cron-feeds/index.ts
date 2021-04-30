import { PubSub } from '@google-cloud/pubsub';

import config from '../config';

const pubSubClient = new PubSub();

import { getFeedsOfLastHours } from './services/feed';

export const cronFeeds = async (): Promise<string[]> => {
  const feeds = await getFeedsOfLastHours(
    config.FEED_URLS.split(','),
    config.RATE_IN_HOURS,
  );
  return Promise.all(feeds.map((feed) => pubSubClient.topic(config.TOPIC_NAME).publishJSON({
    name: feed.title && feed.title.replace(/(\r\n|\n|\r)/gm, ''),
    desc: feed.description && feed.description.replace(/(\r\n|\n|\r)/gm, ''),
    urlSource: feed.link,
  })));
};
