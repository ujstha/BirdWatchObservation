import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonProgressBar,
  IonCard,
  IonCardHeader,
  IonIcon,
  IonCardContent,
  IonPopover,
} from "@ionic/react";
import axios from "axios";
import moment from "moment";
import { arrowForward, } from "ionicons/icons";
import { Paper, Button } from "@material-ui/core";

const Home: React.FC = () => {
  const [observations, setObservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateSort, setDateSort] = useState(false);
  const [alphaSort, setAlphabetSort] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [map, setMap] = useState(false);
  const [info, setInfo] = useState(false);

  React.useEffect(() => {
    axios
      .get(
        "https://birdwatchobservation.herokuapp.com/api/birdwatchobservation"
      )
      .then(res => {
        localStorage.setItem("observations", JSON.stringify(res.data));//saving observations data to localstorage
        setTimeout(function() {
          setIsLoading(false);
        }, 2500); //setting timeout for 2.5s and then disabling isloading
        setObservations(res.data);
      })
      .catch(err => console.log(err.response));
  }, []);

  const ExpandDetails = (id: any) => {
    localStorage.setItem("ID", id); //saving ID in localhost
  };
  const sortByCreateDate = () => {
    setDateSort(!dateSort);
    //Disabling popover and alpha when datesort is on.
    setShowPopover(false);
    setAlphabetSort(false);
  };
  const sortBySpeciesName = () => {
    setAlphabetSort(!alphaSort);
    //Disabling popover and datesort when alphasort is on.
    setShowPopover(false);
    setDateSort(false);
  };

  let sortedObservation = observations;

  if (dateSort) {
    //comparing createdDate and sorting accordingly
    sortedObservation = observations.sort((itemA, itemB) =>
      Date.parse(itemA["createdDate"]) < Date.parse(itemB["createdDate"])
        ? 1
        : -1
    );
  } else if (!dateSort) {
    sortedObservation = observations.sort((itemA, itemB) =>
      Date.parse(itemA["createdDate"]) > Date.parse(itemB["createdDate"])
        ? 1
        : -1
    );
  }
  if (alphaSort) {
    //sorting by alphabet of speciesName - Need uppercase or lowercase letter
    //uppercase in server side
    sortedObservation = observations.sort((itemA, itemB) =>
      itemA["speciesName"] > itemB["speciesName"] ? 1 : -1
    );
  } else if (!alphaSort) {
    sortedObservation = observations;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading && <IonProgressBar type="indeterminate" />}
        <Button
          className="m-0 rounded-0"
          fullWidth
          variant="contained"
          onClick={() => setShowPopover(true)}
        >
          Sort the List
        </Button>
        <IonPopover
          isOpen={showPopover}
          onDidDismiss={() => setShowPopover(false)}
        >
          <IonList
            className="text-center p-2"
            style={{ fontSize: 18 }}
            onClick={() => sortByCreateDate()}
          >
            Sort By Timestamp
          </IonList>
          <IonList
            className="text-center p-2"
            style={{ fontSize: 18 }}
            onClick={() => sortBySpeciesName()}
          >
            Sort Alphabetically
          </IonList>
        </IonPopover>
        {observations.length === 0 && !isLoading ? (
          <IonList className="text-center p-2 mt-5">
            <h2>
              {/* Data not found message. */}
              Oops.... Data was not found.
              <br /> Try Refreshing the page.
            </h2>
          </IonList>
        ) : (
          // fetching data and mapping 
          !isLoading &&
          sortedObservation.map((observation, index) => {
            return (
              <Paper
                key={index}
                className={`mt-3 ${
                  index + 1 === observations.length ? "mb-2" : ""
                }`}
                elevation={8}
              >
                <IonCard className="ion-no-margin">
                  <div className="species-data-container">
                    <img
                      src={observation["speciesImage"]}
                      alt={observation["speciesName"]}
                      className="species-image"
                    />
                    <IonCardHeader className="ion-no-padding ion-no-margin py-2 px-3">
                      <div className="clearfix">
                        <span className="float-left species-name">
                          {observation["speciesName"]}
                        </span>
                        <span
                          className="float-right more-detail"
                          onClick={() => {
                            ExpandDetails(observation["_id"]);
                            setInfo(!info);
                          }}
                        >
                          <IonIcon
                            icon={arrowForward}
                            className={
                              (info || map) &&
                              observation["_id"] === localStorage.ID
                                ? "reverse"
                                : "forward"
                            }
                          />
                        </span>
                      </div>
                      <small>
                        Rarity : {observation["rarity"]} &nbsp; &nbsp;
                        <span className="map-info-icon">
                          <i
                            className="fa fa-map-marked-alt"
                            onClick={() => {
                              ExpandDetails(observation["_id"]);
                              setMap(!map);
                              setInfo(false);
                            }}
                          ></i>{" "}
                          &nbsp;
                          <i
                            className="fa fa-info-circle"
                            onClick={() => {
                              ExpandDetails(observation["_id"]);
                              setInfo(!info);
                              setMap(false);
                            }}
                          ></i>
                        </span>
                      </small>
                    </IonCardHeader>
                    <IonCardContent
                      className={`species-data-content ${
                        map && observation["_id"] === localStorage.ID
                          ? "species-data ion-no-margin ion-no-padding"
                          : ""
                      }`}
                    >
                      {observation["geoLatitude"] &&
                      observation["geoLongitude"] ? (
                        <iframe
                          title={observation["speciesName"]}
                          src={`https://maps.google.com/maps?q=${observation["geoLatitude"]}, ${observation["geoLongitude"]}&z=15&output=embed`}
                          width="100%"
                          height="255"
                          frameBorder="0"
                        ></iframe>
                      ) : (
                        <div className="text-center text-light mt-5">
                          <h1>
                            Oops.... It seems like this image has no GPS
                            Location.
                          </h1>
                        </div>
                      )}
                    </IonCardContent>
                    <IonCardContent
                      className={`species-data-content ${
                        info && observation["_id"] === localStorage.ID
                          ? "species-data ion-no-margin ion-no-padding"
                          : ""
                      }`}
                    >
                      <h3>{observation["notes"]}</h3>
                    </IonCardContent>
                  </div>
                </IonCard>
              </Paper>
            );
          })
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
