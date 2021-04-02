// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const { getFeedsOfLastHours } = require('./services/feed');

AWS.config.update({ region: process.env.region });
const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

const handler = async () => {
  const { FEEDS_URLS: feedsUrls } = process.env;
  const feeds = await getFeedsOfLastHours(
    feedsUrls.split(','),
    parseInt(process.env.RATE_IN_HOURS, 10),
  );

  const publish = (feed) => sns.publish({
    Message: JSON.stringify({
      name: feed.title && feed.title.replace(/(\r\n|\n|\r)/gm, ''),
      desc: feed.description && feed.description.replace(/(\r\n|\n|\r)/gm, ''),
      urlSource: feed.link,
    }),
    TopicArn: process.env.TOPIC_ARN,
  }).promise();

  return Promise.all(feeds.map(publish));
};

module.exports = {
  handler,
};
