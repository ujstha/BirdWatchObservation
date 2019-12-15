import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonMenuButton,
  IonIcon,
} from "@ionic/react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { cloudUpload } from "ionicons/icons";

const AddObservation: React.FC = () => {
  const [speciesName, setSpeciesName] = useState("");
  const [rarity, setRarity] = useState("");
  const [notes, setNotes] = useState("");
  const [speciesImage, setSpeciesImage] = useState(Object);
  const [imageName, setImageName] = useState("");
  const [base64, setBase64] = useState(Object);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleImageChange = (e: any) => {
    let file = e.target.files[0];
    setSpeciesImage(file);
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      setImageName(file.name);
    }
  };

  const AddObservation = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("speciesImage", speciesImage, speciesImage["name"]);
    formData.append("speciesName", speciesName);
    formData.append("rarity", rarity);
    formData.append("notes", notes);

    axios
      .post("http://localhost:5000/api/birdwatchobservation", formData)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  };

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
        <IonList>
          <IonCard className="welcome-card">
            <IonCardHeader>
              {success && (
                <div className="alert alert-success rounded-0 text-center">
                  {success}
                </div>
              )}
              <IonCardTitle className="text-center text-uppercase">
                New Observation
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form
                encType="multipart/form-data"
                className="MuiPaper-root"
                onSubmit={e => AddObservation(e)}
              >
                <input
                  type="text"
                  className="form-control mt-2 rounded-0"
                  placeholder="Write species name *"
                  onChange={e => setSpeciesName(e.target.value)}
                />

                <select
                  className="form-control mt-2 rounded-0"
                  placeholder="Select Rarity *"
                  onChange={e => setRarity(e.target.value)}
                  value={rarity}
                >
                  <option value="">Select Rarity</option>
                  <option value="common">Common</option>
                  <option value="rare">Rare</option>
                  <option value="extremely rare">Extremely Rare</option>
                </select>

                <input
                  type="text"
                  className="form-control mt-2 rounded-0"
                  placeholder="Write notes *"
                  onChange={e => setNotes(e.target.value)}
                />

                <div className="clearfix w-100">
                  <label
                    htmlFor="file-upload"
                    className="file-upload-button mt-2 mb-0"
                  >
                    <div className="file-name">
                      <IonIcon icon={cloudUpload} />{" "}
                      {imageName ? imageName : "Upload an Image...."}
                    </div>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="rounded-0"
                    accept="image/*"
                    onChange={e => handleImageChange(e)}
                  />

                  {imageName && (
                    <img
                      src={base64}
                      alt={imageName}
                      style={{ height: 80, width: 80 }}
                      className="float-right mt-2"
                    />
                  )}
                </div>

                <Button
                  type="reset"
                  className="mt-3 rounded-0 MuiButton-contained MuiButton-containedSecondary"
                  style={{ width: "calc(50% - 8px)", marginRight: 16 }}
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  className="mt-3 rounded-0 MuiButton-contained MuiButton-containedPrimary"
                  style={{ width: "calc(50% - 8px)" }}
                  disabled={
                    speciesImage && speciesImage["size"] <= 2000000
                      ? false
                      : true
                  }
                >
                  Save
                </Button>
              </form>
            </IonCardContent>
          </IonCard>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddObservation;
