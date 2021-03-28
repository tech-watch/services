const { createCard } = require('./services/trello');

const handler = async (event) => {
  const { Records } = event;
  return Promise.all(Records.map((r) => createCard(
    process.env.TRELLO_ID_LIST,
    JSON.parse(r.body),
  )));
};

module.exports = {
  handler,
};
