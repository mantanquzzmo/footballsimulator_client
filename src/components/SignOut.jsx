import React from "react";
import { connect } from "react-redux";
import { signOutUser } from "../state/actions/redux-token-auth-config";

const SignOut = (props) => {

  const innerSignOut = (e) => {
    debugger
    const { signOutUser } = props;
    e.preventDefault();

    signOutUser()
      .then(() => {
        console.log("User logged out");
      })
      .catch(() => {
        console.log("Couldn't log out user");
      });
  };

  return (
    <div className="login">
      <button
        onClick={(e) => {
          innerSignOut(e);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  };
};

export default connect(mapStateToProps, { signOutUser })(SignOut);
