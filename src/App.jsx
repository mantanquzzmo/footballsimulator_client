import React from "react";
import { connect } from "react-redux";
import TeamsDashboard from "./components/TeamsDashboard";
import PlayerBio from "./components/PlayerBio.jsx";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import CreateTeam from "./components/CreateTeam.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />

        <Switch>
          <Route exact path="/teams" component={TeamsDashboard} />
          <Route exact path="/createteam" component={CreateTeam} />
          <Route exact path="/playerbio" component={PlayerBio} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  };
};

export default connect(mapStateToProps)(App);
