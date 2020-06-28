import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../state/actions/redux-token-auth-config";


const RegisterScreen = (props) => {
  const submitForm = (e) => {
    const { registerUser } = props;
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value

    registerUser({ email, password })
      .then(() => {
      })
      .catch(console.log("Registration failed"));
  };



  return (
    <div className="login">
      <form onSubmit={(e) => submitForm(e)}>
        <input name="email" type="email" id="email"></input>
        <input name="password" type="password" id="password"></input>
        <button id="submit">submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  };
};

export default connect(mapStateToProps, { registerUser })(RegisterScreen);
