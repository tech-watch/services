const fetch = require('node-fetch');

const TRELLO_API_ENDPOINT = 'https://api.trello.com';

/**
 * Create a tech hint
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createCard = async (list, body) => fetch(`${TRELLO_API_ENDPOINT}/1/cards`, {
  method: 'POST',
  body: JSON.stringify({
    key: process.env.TRELLO_API_KEY,
    token: process.env.TRELLO_API_TOKEN,
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

module.exports = {
  createCard,
};
