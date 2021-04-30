import * as functions from 'firebase-functions';

import { createCard } from './services/trello';

import type { Response } from './types';
import config from '../config';

export const sendToTrello = async (message: functions.pubsub.Message): Promise<Response | string> => {
  const content = Buffer.from(message.data, 'base64').toString('utf-8');
  return createCard(
    config.TRELLO_LIST_ID,
    JSON.parse(content),
  );
};
