## Bird Watch Observation
This project was created using Ionic Framework with ionic-react and capacitor. This is a hybrid application as well as progressive web application (the app will run without internet connection). <br />
This app has also been deployed as a web app. <br />
Open [https://birdwatchobservation.netlify.com/](https://birdwatchobservation.netlify.com/).

## Stacks used

This is a hybrid application build on top of Ionic React Framework along with following stacks

- [Ionic-react](https://ionicframework.com/docs/react)
- [Capacitor](https://capacitor.ionicframework.com)
- [Node](https://nodejs.org/en)
- [mLab](https://mlab.com)
- [Express](https://expressjs.com)
- [Material-UI](https://material-ui.com)

## Other requirements

For this app to run locally, you should have following package installed in your device.<br />
Links are provided to download and install the packages required.

- [Cloudinary](https://cloudinary.com)
- [Node](https://nodejs.org/en)
- [mLab](https://www.mlab.com)

## App Installation

If you want run the app locally <br /> 
Go to following location in project directory : <br />
- src\pages\AddObservation.tsx (on line 64) <br />
    replace the code with following code

```JS
axios.post(`http://localhost:5000/api/birdwatchobservation`);
//axios.post(`https://birdwatchobservation.herokuapp.com/api/birdwatchobservation`);

```
and <br />

- src\pages\OnlineView.tsx (on line 40)<br />
replace the code with following code

```JS
axios.get(`http://localhost:5000/api/birdwatchobservation`);
//axios.get(`https://birdwatchobservation.herokuapp.com/api/birdwatchobservation`);

```

## Scripts to run 
In the project directory, you can run: <br />
### `npm install` 
- Installs the required packages and dependecies that are in `package.json`.

### `ionic serve`

Runs the app in the development mode.<br />
Open [http://localhost:8100] to view it in the browser.

The page will reload automatically, if you make changes in any file.<br />

<!-- In order to run mobile app on android devices -->
### `ionic capacitor run android`

Builds the app for production to the `build` folder.<br />
And copies data by capacitor for deploying in android device.


NOTE: For this app to run with full function it needs a backend which is deployed in HEROKU.
You can also run backend locally. For that you need to visit my other git repository. <br />
Open [https://github.com/ujstha/BirdWatchObservation-server/] and follow the instructions to run it.

## Demo Link (for web view)

[https://birdwatchobservation.netlify.com/](https://birdwatchobservation.netlify.com/)