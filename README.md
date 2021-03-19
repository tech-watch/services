# Serverless AWS Lambda Cron to send feeds to trello

Configure an AWS profile on your machine named `perso`.

Add a `.env` file with the following environment variables:

- FEEDS_URLS
- RATE_IN_HOURS
- API_KEY
- TRELLO_API_KEY
- TRELLO_API_TOKEN
- TRELLO_ID_LIST

## Development

```bash
npm start
```

## Deploy

```bash
npm run deploy
```
