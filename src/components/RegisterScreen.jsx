import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../state/actions/redux-token-auth-config";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "test@mail.com",
      password: "fuckoff",
    };

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    const { registerUser } = this.props;
    const email = "email1@email.com"
    const password = "49794979"

    registerUser({ email, password }) // <-<-<-<-<- here's the important part <-<-<-<-<-
      .then(console.log("hej"))
      .catch(console.log("nej"));
  }

  render() {
    const { submitForm } = this;
    return (
      <div className="Hej">
        <form onSubmit={submitForm}>
          <input type="text"></input>
          <input type="text"></input>
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { registerUser })(RegisterScreen);
