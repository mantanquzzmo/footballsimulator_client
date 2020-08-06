import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSeason } from "../modules/backend_calls";

const SeasonInfo = (props) => {
  const [standings, setStandings] = useState(null);

  const loadSeasonStandings = async () => {
    let response = await getSeason(props.seasonId);
    debugger

    if (response.error) {
      props.message(response.message);
    } else {
      props.setSeasonStandings(response.data);
      setStandings(
        response.data.map((team) => {
          return (
            <>
              <div className="teamName">{team[0]}</div>
              {/* Add link (team[1]) to team page  */}
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

  useEffect(() => {
    loadSeasonStandings();
  }, []);

  return (
    <div className="leagueTable">
      <p>Team</p>
      <p>Played</p>
      <p>Won</p>
      <p>Drawn</p>
      <p>Lost</p>
      <p>GF</p>
      <p>GA</p>
      <p>G Diff</p>
      <p>Points</p>
      {standings}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    seasonInfo: state.footballsimulator.seasonInfo,
    seasonStandings: state.footballsimulator.seasonStandings,
    seasonId: state.footballsimulator.seasonId,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonInfo);
