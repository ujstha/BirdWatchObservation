# BirdWatchObservation
This project was created using Ionic Framework with ionic-react and capacitor.
This app is a progressive web app which means it can be opened without internet connection.
This app has also been deployed as a web app. <br />
Open [https://birdwatchobservation.netlify.com/].

## Available Scripts

In the project directory, you can run:
### `npm install` 
Installs the packages and dependecies

### `ionic serve`

Runs the app in the development mode.<br />
Open [http://localhost:8100] to view it in the browser.

The page will reload if you make edits.<br />

<!-- In order to run mobile app on android devices -->
### `ionic capacitor run android`

Builds the app for production to the `build` folder.<br />
And copies data by capacitor for deploying in android device.


NOTE: For this app to run with full function it needs a backend which is deployed in HEROKU.
You can also run backend locally. For that you need to visit my other git repository. <br />
Open [https://github.com/ujstha/BirdWatchObservation-server/] and follow the instructions to run it.

## If BirdWatchObservation-server (backend) is run locally
Please replace the <br />
"https://birdwatchobservation.herokuapp.com/" <br />

with  <br />
"http://localhost:5000/"   <br />
in `AddObservation.tsx` && `OnlineView.tsx` of BirdWatchObservation repo (a.k.a. frontend).
