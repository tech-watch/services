import fetch from 'node-fetch';

import type { Message, Response } from '../types';
import config from '../../config';

/**
 * Create a tech hint
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const createCard = async (list: string, body: Message): Promise<Response> => fetch(`${config.TRELLO_API_ENDPOINT}/1/cards`, {
  method: 'POST',
  body: JSON.stringify({
    key: config.TRELLO_API_KEY,
    token: config.TRELLO_API_TOKEN,
    idList: list,
    ...body,
  }),
  headers: { 'Content-Type': 'application/json' },
})
  .then((response) => response.json())
  .then((response) => {
    if (response.error) {
      throw new Error(response.error);
    }
    return {
      status: response.status,
      statusText: response.statusText,
      title: body.name,
    };
  });
