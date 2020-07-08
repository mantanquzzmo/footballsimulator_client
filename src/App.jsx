import React from "react";
import { connect } from "react-redux";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import Teams from "./components/Teams";
import PlayerBio from "./components/PlayerBio.jsx"
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Register />
        <SignIn />
        <SignOut />

        <Switch>
          <Route exact path="/teams" component={Teams} />
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
