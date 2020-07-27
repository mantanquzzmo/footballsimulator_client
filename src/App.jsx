import React from "react";
import { connect } from "react-redux";
import TeamsDashboard from "./components/TeamsDashboard";
import PlayerBio from "./components/PlayerBio.jsx";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import CreateTeam from "./components/CreateTeam.jsx";
import Header from "./components/Header.jsx";
import SeasonDashboard from "./components/SeasonDashboard.jsx";
import { Redirect } from 'react-router'

function App(props) {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Sidebar />

        <Switch>
          <Route exact path="/" component={TeamsDashboard} />
          <Route exact path="/createteam" component={CreateTeam} />
          <Route exact path="/playerbio" component={PlayerBio} />
          <Route
            exact
            path="/season"
            render={() => (props.teamId ? <SeasonDashboard /> : <Redirect to="/" />)}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    teamId: state.footballsimulator.teamId,
  };
};

export default connect(mapStateToProps)(App);
