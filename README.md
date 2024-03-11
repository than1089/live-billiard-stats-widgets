# Stats Widgets

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

### Build Frontend locally
There is a memory limit issue with Heroku to build the React app on the server. There should be a setting to fix this. The work-around solution at the moment is to create the front-end build locally
```
cd client && npm run build && cd ..
```

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

