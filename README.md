# Live Billiard Stats Widgets

Live billiard stats widget that connect with Google Sheets API and update data in real-time. Widget sizes are dynamic based on the screen size.

## Technical stack
- **Front-end:** React, TypeScript, Socket.io
- **Back-end:** Node.js, TypeScript, Express.js, Google Sheets API

## Demo
- https://pbs-pgs-vegas-2024-ref-widgets-3090ff3442a7.herokuapp.com/singles-table-1/stats
- https://pbs-pgs-vegas-2024-ref-widgets-3090ff3442a7.herokuapp.com/singles-table-2/stats
- https://pbs-pgs-vegas-2024-ref-widgets-3090ff3442a7.herokuapp.com/teams-table-1/stats
- https://pbs-pgs-vegas-2024-ref-widgets-3090ff3442a7.herokuapp.com/teams-table-2/stats


## Installation

### Backend Node.js

```
npm install
```

### Frontend React

```
cd client
npm install
cd ..
```

## Google credentials json

https://developers.google.com/workspace/guides/create-credentials#service-account

- Create a new project from https://console.cloud.google.com/
- Go to `APIs & Services`
- Click on `Enable APIs and Services`
- Search for `Google Sheets API` and enable it.
- Go back to `APIs & Services` dashboard
- Create a new Service Account and download the json file.

Copy and paste the content from the json file to `google-credentials.json` file. This file is confidential and is ignored by git, **DO NOT** add it to the git tracking file.

## Development mode

```
ts-node app.ts

cd client && npm start
```


## Deployment

### Heroku git URL

Create a new Heroku project and look for the `Heroku git URL` in `Settings` tab.

Add `Heroku git URL` to git remote config:
```
git remote add heroku {Heroku git URL}
```

### Heroku login
```
heroku login
```

### Google Credentails on Heroku

- Go to project settings
- Look for `Config Vars` and click on `Reveal Config Vars`
- Add new key `GOOGLE_CREDENTIALS` with the content is the content from your Google Account credentails json file.

### Deploy
```
git push heroku main
```

