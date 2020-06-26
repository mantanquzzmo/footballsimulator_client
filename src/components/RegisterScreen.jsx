import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../state/actions/redux-token-auth-config";

const RegisterScreen = (props) => {
  const submitForm = (e) => {
    const { registerUser } = props;
    e.preventDefault();
    const email = "email3@email.com";
    const password = "49794979";

    registerUser({ email, password })
      .then(() => {
      })
      .catch(console.log("nej"));
  };

  return (
    <div className="Hej">
      <form onSubmit={(e) => submitForm(e)}>
        <button>submit</button>
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