import React from "react";
import { useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
const TeamList = React.lazy(() => import("./TeamList"));
const MatchList = React.lazy(() => import("./MatchList"));
const PlayerList = React.lazy(() => import("./PlayerList"));

export default function Home() {
  const history = useHistory();
  const redirectTo = (route) => {
    history.push(route);
  };
  return (
    <React.Fragment>
      <div className="home-page-wrapper full-height">
        <MatchList editMode={true} />
        <TeamList editMode={true} />
        <PlayerList editMode={true} />
      </div>
      <Footer />
    </React.Fragment>
  );
}
