# oauth2-test

## What is this repository for?
This repository was created for my OAuth2 test project.
My Project's functionality is quite simple, u can log in with your Google Account, and fetch data. In this case your E-Mails.

## Setup
- Go to console.cloud.google.com
- Create and Select Project (for example: client-test)
- Go To APIs & Services => Enabled APIS => Credentials
- Click on Create Credentials => OAuth client ID
- Click Configure Consent Screen

### Oauth Consent Screen
Select:
- External 
- Click CREATE
- App name (Oauth Test)
- User Support Email (your email)

##### Developer contact information
- Email adresses: (your email & others if you want to)
- Click SAVE AND CONTINUE

#### Scopes
- Click ADD OR REMOVE SCOPES
- Select .../auth/userinfo.email
- Select .../auth/userinfo.profile
- Click UPDATE
- Click SAVE AND CONTINUE

#### Test users
- + ADD USERS (your email)
- Click SAVE AND CONTINUE

#### Summary
- Click BACK TO DASHBOARD

- Go to Credentials
- Click CREATE CREDENTIALS => OAuth client ID

### Create OAuth client ID
- Application Type (Web Application)
- Name (Web client 1)

##### Authorized JavaScript origins
- URIs (http://localhost:4200)
##### Authorized redirect URIs
- URIs (http://localhost:4200)
- Click CREATE

- Copy "Your Client ID"

- Go to Enabled APIs & Services
- Click + ENABLE APIS AND SERVICES
- Search "gmail"
- Select Gmail API
- Click ENABLE

- Go to OAuth consent screen
- Click EDIT APP
- Click SAVE AND CONTINUE (to go to scopes)
- Click ADD OR REMOVE SCOPES
- Search "gmail => Select .../auth/gmail.readonly
- Click UPDATE

- Click SAVE AND CONTINUE
- Click SAVE AND CONTINUE
- Click BACK TO DASHBOARD

## Adapt Project
- Go to google-api.service.ts
- Change clientID to the copied clientId 

## Help
https://www.youtube.com/watch?v=QV5YtczsorY
https://www.youtube.com/watch?v=9s6Vc6Xdgh4
