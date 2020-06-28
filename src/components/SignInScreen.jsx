import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { signInUser } from "../state/actions/redux-token-auth-config";


const SignInScreen = (props) => {
  const submitForm = (e) => {
    const { signInUser } = props;
    e.preventDefault();
    const email = e.target.email2.value
    const password = e.target.password2.value

    signInUser({ email, password })
      .then(() => {
        console.log('test')})
      .catch(() => {console.log("nej")});
  };


  return (
    <div className="login">
      <form onSubmit={(e) => submitForm(e)}>
        <input name="email2" type="email2" id="email2"></input>
        <input name="password2" type="password2" id="password2"></input>
        <button id="submit2">submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  };
};

export default connect(mapStateToProps, { signInUser })(SignInScreen);
