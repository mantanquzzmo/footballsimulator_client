import React from "react";
import { connect } from "react-redux";
import { signInUser } from "../state/actions/redux-token-auth-config";


const SignIn = (props) => {
  const submitForm = (e) => {
    const { signInUser } = props;
    e.preventDefault();
    const email = e.target.email2.value
    const password = e.target.password2.value

    signInUser({ email, password })
      .then(() => {
        console.log(`${email} logged in succesfully`)})
      .catch(() => {console.log("Login Failed.")});
  };


  return (
    <div className="login">
      Login
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

export default connect(mapStateToProps, { signInUser })(SignIn);
