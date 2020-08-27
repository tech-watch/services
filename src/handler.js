const fetch = require('node-fetch');
const Parser = require('rss-parser');

const parser = new Parser();

const handler = async () => {
  const url = 'https://blog.engineering.publicissapient.fr/feed/';
  const feed = await parser.parseURL(url);

  const limitDate = new Date();
  limitDate.setHours(limitDate.getHours() - 1);

  const { webhookUrl } = process.env;

  const itemsToAdd = feed.items
    .filter((i) => new Date(i.pubDate).getTime() > limitDate)
    .sort((a, b) => new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime())
    .map((i) => fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: i.title && i.title.replace(/(\r\n|\n|\r)/gm, ''),
        desc: i.description && i.description.replace(/(\r\n|\n|\r)/gm, ''),
        urlSource: i.link,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${process.env.apiKey}`,
      },
    })
      .then((response) => {
        console.log(
          `Response: ${response.status} ${response.statusText}`,
        );
        return response.json();
      })
      .catch((err) => {
        console.error(err);
        return err;
      }));

  return Promise.all(itemsToAdd);
};

module.exports = {
  handler,
};
