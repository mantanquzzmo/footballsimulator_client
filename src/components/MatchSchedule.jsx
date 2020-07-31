import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRound } from "../modules/backend_calls";

const MatchSchedule = (props) => {
  const [roundNo, setRoundNo] = useState(null);
  const [round, setRound] = useState(null);
  const [prevRound, setPrevRound] = useState(null);
  const [nextRound, setNextRound] = useState(null);
  const [apiRound, setApiRound] = useState(props.seasonInfo.round);

  const loadMatchSchedule = async () => {
    let response = await getRound(props.teamId, apiRound);
    if (response.error) {
      props.message(response.message);
    } else {
      setRoundNo(response.data[0].round);
      setRound(
        response.data.map((round) => {
          return (
            <div className="game">
              {round.home_team} {round.goals_ht === null ? "X" : round.goals_ht}{" "}
              - {round.goals_at === null ? "X" : round.goals_at}{" "}
              {round.away_team}
            </div>
          );
        })
      );
      setPrevRound(response.data[0].round - 2);
      setNextRound(response.data[0].round);
    }
  };

  useEffect(() => {
    loadMatchSchedule();
  }, []);

  useEffect(() => {
    loadMatchSchedule();
  }, [apiRound]);

  return (
    <div className="matchSchedule">
      {props.seasonInfo && (
        <>
          {prevRound >= 0 && (
            <button
              onClick={() => {
                setApiRound(prevRound);
              }}
            >
              Previous Round
            </button>
          )}
          {props.seasonInfo.total_rounds - nextRound !== 0 && (
            <button
              onClick={() => {
                setApiRound(nextRound);
              }}
            >
              Next Round
            </button>
          )}
          <br /> {roundNo && "Round: " + roundNo}
          {round}
        </>
      )}
    </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchSchedule);
