import React from "react";
import { Button } from 'reactstrap'
import { connect } from "react-redux";
import Register from "./Register";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div class="sidenav">
      <Register />
      <SignIn />
      <SignOut />
      <Link to="/teams">
        <Button>My Team</Button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  };
};

export default connect(mapStateToProps)(Sidebar);
