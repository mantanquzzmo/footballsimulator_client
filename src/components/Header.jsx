import React, { useState } from "react";
import { connect } from "react-redux";
import { postSeason, putRound } from "../modules/backend_calls";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

const Header = (props) => {
  const [redirectToResults, setRedirectToResults] = useState(false);
  let buttonText = "Next";
  let onClick = null;
  let leagueStandingButton = null;
  let teamRosterButton = null;

  if (props.seasonInfo) {
    switch (props.seasonInfo.round) {
      case -1:
        buttonText = "Start Season";
        onClick = () => {
          startSeason();
        };
        break;
      default:
        buttonText = `Gameday ${props.seasonInfo.round + 1}`;
        onClick = () => {
          continueSeason();
        };
        break;
    }
  } else {
    buttonText = "Loading...";
  }

  const startSeason = async () => {
    let modal = document.getElementById("loadingModal");
    modal.style.display = "block";
    const response = await postSeason(props.teamId);
    if (response.isAxiosError) {
      props.setMessage(response.message);
    } else {
      props.setSeasonInfo(response.data[0]);
      modal.style.display = "none";
      setRedirectToResults(true);
    }
  };

  const continueSeason = async () => {
    let modal = document.getElementById("loadingModal");
    modal.style.display = "block";
    const response = await putRound(
      props.seasonId,
      props.seasonInfo.round
    );
    debugger
    if (response.isAxiosError) {
      props.setMessage(response.response.data.errors);
    } else {
      props.setRound(response.data);
      modal.style.display = "none";
      setRedirectToResults(true);
    }
  };

  if (props.seasonInfo && props.seasonInfo.round !== -1) {
    leagueStandingButton = (
      <Link to="/season">
        <button className="nextButton">League Standing</button>
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

  teamRosterButton = (
    <Link to="/">
      <button className="nextButton">Squad</button>
    </Link>
  );

  return (
    <>
      {redirectToResults && <Redirect to="/season" />}
      <div className="header">
        {teamInfo}
        {teamRosterButton}
        {leagueStandingButton}
        {props.teamId && nextButton}
      </div>

      <div id="loadingModal" className="modal">
        <div className="canvas canvas5">
          <div className="spinner5"></div>
        </div>
      </div>
    </>
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
    seasonId: state.footballsimulator.seasonId,
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
    setRound: (round) => {
      dispatch({ type: "LOAD_ROUND", payload: round });
    },
    setSeasonId: (season) => {
      dispatch({ type: "SET_SEASONID", payload: season });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
