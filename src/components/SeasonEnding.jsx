import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSeason, postSeason } from "../modules/backend_calls";


const SeasonEnding = (props) => {
  const [standings, setStandings] = useState(null);

  const loadSeasonStandings = async () => {
    let response = await getSeason(props.seasonInfo.id);
    if (response.error) {
      props.message(response.message);
    } else {
      props.setSeasonStandings(response.data);
      setStandings(
        response.data.map((team) => {
          return (
            <>
              <div className="teamName">{team[0]}</div>
              <div className="gamesWon">{team[2]}</div>
              <div className="gamesDrawn">{team[3]}</div>
              <div className="gamesLost">{team[4]}</div>
              <div className="goalsFor">{team[5]}</div>
              <div className="goalsAgainst">{team[6]}</div>
              <div className="goalsAgainst">{team[7]}</div>
              <div className="goalsDiff">{team[8]}</div>
              <div className="points">{team[9]}</div>
            </>
          );
        })
      );
    }
  };

  const startNextSeason = async () => {
    const response = await postSeason(props.teamId);
    if (response.isAxiosError) {
      props.setMessage(response.message);
    } else {
      props.setSeasonInfo(response.data[0]);
      props.setNextRoundNo(1);
    }
  };

  useEffect(() => {
    if (props.seasonInfo) {
    loadSeasonStandings();
  }}, []);

  return (
    <>
      <div className="seasonEnding">
        {props.seasonInfo && props.seasonInfo.winner}
      </div>
      <div className="leagueTable">{standings}</div>
      <button onClick={() => startNextSeason()} className="nextButton">Start new season</button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    seasonInfo: state.footballsimulator.seasonInfo,
    teamId: state.footballsimulator.teamId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTeamInfo: (team) => {
      dispatch({ type: "LOAD_TEAM", payload: team });
    },
    setSeasonStandings: (season) => {
      dispatch({ type: "SET_STANDINGS", payload: season });
    },
    setSeasonInfo: (season) => {
      dispatch({ type: "LOAD_SEASON", payload: season });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonEnding);
