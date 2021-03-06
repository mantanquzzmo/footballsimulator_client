import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSeason } from "../modules/backend_calls"; 

const SeasonInfo = (props) => {
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

  useEffect(() => {
    loadSeasonStandings();
  }, []);

  return <div className="leagueTable">{standings}</div>
};

const mapStateToProps = (state) => {
  return {
    seasonInfo: state.footballsimulator.seasonInfo,
    seasonStandings: state.footballsimulator.seasonStandings,
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
