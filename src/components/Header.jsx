import React, { useState } from "react";
import { connect } from "react-redux";
import { postSeason, putRound } from "../modules/backend_calls";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

const Header = (props) => {
  const [redirect, setRedirect] = useState(false);
  let buttonText = "Next";
  let onClick = null;
  let leagueStandingButton = null;
  let teamRosterButton = null;

  if (props.seasonInfo) {
    switch (props.nextRoundNo) {
      case 0:
        buttonText = "Start Season";
        onClick = () => {
          startSeason();
        };
        break;
      default:
        buttonText = `Gameday ${props.nextRoundNo}`;
        onClick = () => {
          continueSeason();
        };
        break;
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
      props.setNextRoundNo(1)
    }
  };

  const continueSeason = async () => {
    const response = await putRound(
      props.seasonInfo.id,
      props.nextRoundNo
    );
    if (response.isAxiosError) {
      props.setMessage(response.message);
    } else {
      props.setRound(response.data);
      props.setNextRoundNo(props.nextRoundNo + 1)
      setRedirect(true);
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
      {redirect && <Redirect to="/" />}
      <div className="header">
        {teamInfo}
        {teamRosterButton}
        {leagueStandingButton}
        {props.teamId && nextButton}
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
    nextRoundNo: state.footballsimulator.nextRoundNo,
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
    setNextRoundNo: (round) => {
      dispatch({ type: "SET_NEXTROUNDNO", payload: round });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
