import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

const AddObservation: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>New Observation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
       <h1>new observation create page here</h1>
      </IonContent>
    </IonPage>
  );
};

export default AddObservation;
