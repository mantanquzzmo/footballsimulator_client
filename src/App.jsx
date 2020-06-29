import React from "react";
import { connect } from "react-redux";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

function App() {
  return (
    <>
      <Register />
      <SignIn />
      <SignOut />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    first_state: state.first_state,
  };
};

export default connect(mapStateToProps)(App);
