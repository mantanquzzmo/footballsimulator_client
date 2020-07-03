import React from "react";
import { connect } from "react-redux";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import Teams from './components/Teams'

function App() {
  return (
    <>
      <Register />
      <SignIn />
      <SignOut />
      <Teams />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  };
};

export default connect(mapStateToProps)(App);
