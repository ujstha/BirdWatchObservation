import React from "react";
import OnlineView from "./OnlineView";
import OfflineView from "./OfflineView";

const Home: React.FC = () => {
  return navigator.onLine ? <OnlineView /> : <OfflineView />;
};

export default Home;
