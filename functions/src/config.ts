import * as functions from 'firebase-functions';

export default {
  TRELLO_API_ENDPOINT: 'https://api.trello.com',
  TOPIC_NAME: 'FEEDS',
  RATE_IN_HOURS: 24,
  FEED_URLS: 'https://blog.engineering.publicissapient.fr/feed/,https://blog.octo.com/feed/,https://reactjs.org/feed.xml',
  TRELLO_LIST_ID: functions.config()?.trello.list.id,
  TRELLO_API_KEY: functions.config()?.trello.api.key,
  TRELLO_API_TOKEN: functions.config()?.trello.api.token,
}