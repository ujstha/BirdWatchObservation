import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  setupConfig,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AppPage } from "./declarations";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import Menu from "./components/Menu";
import { add, home } from "ionicons/icons";
import { Home, AddObservation } from "./pages/Tabs";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./css/index.css";

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/home",
    icon: home,
  },
  {
    title: "Add Observation",
    url: "/add-observation",
    icon: add,
  },
];

setupConfig({
  rippleEffect: true,
  mode: "md",
});

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Raleway", "Montserrat", "sans-serif"].join(","),
  },
});

const App: React.FC = () => (
  <MuiThemeProvider theme={theme}>
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu appPages={appPages} />
          <IonTabs>
            <IonRouterOutlet id="main">
              <Route
                path="/"
                render={() => <Redirect to="/home" />}
                exact={true}
              />
              <Route path="/home" component={Home} exact={true} />
              <Route
                path="/add-observation"
                component={AddObservation}
                exact={true}
              />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="add-observation" href="/add-observation">
                <IonIcon icon={add} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  </MuiThemeProvider>
);

export default App;
