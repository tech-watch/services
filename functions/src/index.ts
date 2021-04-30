import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import config from './config';
import { cronFeeds } from './cron-feeds';
import { sendToTrello } from './send-to-trello';

admin.initializeApp();

exports.cronFeeds = functions.pubsub.schedule('every 24 hours').onRun(cronFeeds);
exports.sendToTrello = functions.pubsub.topic(config.TOPIC_NAME).onPublish(sendToTrello);