import React from "react";
import { connect } from "react-redux";

const Header = () => {
  return (
    <div className="header">
      <button className="nextButton">Next</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createdTeamInfo: (team) => {
      dispatch({ type: "LOAD_TEAM", payload: team });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
