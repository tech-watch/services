# Firebase Cron to send feeds to trello

Add functions config

```bash
firebase functions:config:set TRELLO_API_KEY=XXX
firebase functions:config:set TRELLO_API_TOKEN=XXX
firebase functions:config:set TRELLO_ID_LIST=XXX
```

## Deploy

```bash
firebase deploy --only functions
```
