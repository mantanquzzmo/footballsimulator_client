import React from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import Register from "./Register";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  let currentView;
  if (!props.currentUser.isSignedIn) {
    currentView = (
      <>
        <Register />
        <SignIn />
      </>
    );
  } else {
    currentView = (
      <>
        <SignOut />
        <Link to="/teams">
          <Button>My Team</Button>
        </Link>
        <Link to="/createteam">
          <Button onClick={() => props.teamProgression()}>Create new Team</Button>
        </Link>
      </>
    );
  }
  return <div className="sidenav">{currentView}</div>;
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    teamProgression: () => {
      dispatch({ type: "RESET_CREATION", payload: undefined });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
