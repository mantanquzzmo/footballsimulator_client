import React from "react";
import { connect } from "react-redux";
import { postSeason } from "../modules/backend_calls";
import { Link } from "react-router-dom";

const Header = (props) => {
  let buttonText = "Next";
  let onClick = null;
  let leagueStandingButton = null

  if (props.seasonInfo) {
    switch (props.seasonInfo.round) {
      case -1:
        buttonText = "Start Season";
        onClick = () => {
          startSeason();
        };
        break
      case 0:
        buttonText = "Gameday 1";
        onClick = () => {
          debugger
        };
        break
    }
  } else {
    buttonText = "Loading...";
  }

  const startSeason = async () => {
    const response = await postSeason(props.teamId);
    if (response.isAxiosError) {
      props.setMessage(response.message);
    } else {
      props.setSeasonInfo(response.data[0]);
    }
  };

  if (props.seasonInfo && props.seasonInfo.round !== -1) {
    leagueStandingButton = (
      <Link to="/season">
        <button className="nextButton" onClick="">
          League Standing
        </button>
      </Link>
    );
  }

  let teamInfo = (
    <div className="headerTeamInfo">
      {props.teamName}
      {props.balance}
    </div>
  );

  let nextButton = (
    <button className="nextButton" onClick={onClick}>
      {buttonText}
    </button>
  );

  return (
    <div className="header">
      {teamInfo}
      {leagueStandingButton}
      {props.teamId && nextButton}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    seasonProgression: state.footballsimulator.seasonProgression,
    teamId: state.footballsimulator.teamId,
    teamName: state.footballsimulator.teamName,
    balance: state.footballsimulator.balance,
    seasonInfo: state.footballsimulator.seasonInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTeamInfo: (team) => {
      dispatch({ type: "LOAD_TEAM", payload: team });
    },
    setSeasonInfo: (season) => {
      dispatch({ type: "LOAD_SEASON", payload: season });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
