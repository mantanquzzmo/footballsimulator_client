import React from "react";
import { connect } from "react-redux";

const Header = (props) => {

  let buttonText = "Next"
  let onClick = null

  switch(props.seasonProgression) {
  case -1:
    buttonText = "Start Season"
    onClick = (() => {
      startSeason()
    })
  }

  const startSeason = () => {

  }

  return (
    <div className="header">
      <button className="nextButton" onClick={onClick}>{buttonText}</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    seasonProgression: state.footballsimulator.seasonProgression,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTeamInfo: (team) => {
      dispatch({ type: "LOAD_TEAM", payload: team });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
