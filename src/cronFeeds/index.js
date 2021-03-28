// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const { getFeedsOfLastHours } = require('./services/feed');

AWS.config.update({ region: process.env.region });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const handler = async () => {
  const { FEEDS_URLS: feedsUrls } = process.env;
  const feeds = await getFeedsOfLastHours(
    feedsUrls.split(','),
    parseInt(process.env.RATE_IN_HOURS, 10),
  );

  const addToQueue = (feed) => sqs.sendMessage({
    MessageBody: JSON.stringify({
      name: feed.title && feed.title.replace(/(\r\n|\n|\r)/gm, ''),
      desc: feed.description && feed.description.replace(/(\r\n|\n|\r)/gm, ''),
      urlSource: feed.link,
    }),
    QueueUrl: process.env.SQS_SEND_TO_TRELLO_QUEUE_URL,
  }).promise();

  return Promise.all(feeds.map(addToQueue));
};

module.exports = {
  handler,
};
