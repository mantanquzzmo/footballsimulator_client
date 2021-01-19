import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTeam } from "../modules/backend_calls.jsx";
import { skillStars, formBars, formTendencyArrow } from "../helpers/skillStars";
import { Link } from "react-router-dom";

const TeamRoster = (props) => {
  const [players, setPlayers] = useState(null);

  const fetchTeam = async () => {
    const team = await getTeam(props.teamId);
    if (team.error) {
      props.changeMessage(team.error);
    } else {
      props.setTeamInfo(team[0]);
      props.setPlayersInfo(team[1]);
      props.setSeasonInfo(team[2]);
      props.setTeamProgression(1);
      if (team[2] === null) {
        props.setNextRoundNo(0)
      } else if (team[2].round === 0) {
        props.setNextRoundNo(1)
      } else {
        props.setNextRoundNo(team[2].round + 1)
      }
      setPlayers(
        team[1].map((player) => {
          let stars = skillStars(player.skill, player.id);
          let form = formBars(player.form, player.id);
          let formTendency = formTendencyArrow(player.form_tendency, player.id);
          let starting_11
          if (player.starting_11 === true) {
            starting_11 = "yes" } else {
              starting_11 = "no"
            }
          return (
            <>
              <div className="playerBio" key={player.id}>
                <Link
                  to="/playerbio"
                  onClick={() => {
                    props.selectPlayerId(player.id);
                  }}
                >
                  {player.name}
                </Link>
              </div>
              <div className="playerAge" key={"age" + player.id}>
                {player.age}
              </div>
              <div className="playerPosition" key={"position" + player.id}>
                {player.position}
              </div>
              <div className="playerSkill" key={"skill" + player.id}>
                {stars}
              </div>
              <div className="playerForm" key={"form" + player.id}>
                {form}
              </div>
              <div
                className="playerFormTendency"
                key={"formTendency" + player.id}
              >
                {formTendency}
              </div>
              <div className="inStartingEleven" key={"starting11" + player.id}>{starting_11}</div>
            </>
          );
        })
      );
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <>
      TeamRoster:
      <div className="player-grid">{players}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    teamId: state.footballsimulator.teamId,
    teamName: state.footballsimulator.teamName,
    primaryColor: state.footballsimulator.primaryColor,
    secondaryColor: state.footballsimulator.secondaryColor,
    teamPlayers: state.footballsimulator.teamPlayers,
    teamProgression: state.footballsimulator.teamProgression,
    balance: state.footballsimulator.balance,
    nextRoundNo: state.footballsimulator.balance
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTeamInfo: (team) => {
      dispatch({ type: "LOAD_TEAM", payload: team });
    },
    setPlayersInfo: (players) => {
      dispatch({ type: "LOAD_PLAYERS", payload: players });
    },
    setSeasonInfo: (season) => {
      dispatch({ type: "LOAD_SEASON", payload: season });
    },
    setTeamProgression: (value) => {
      dispatch({ type: "INCREASE_PROGRESSION", payload: value });
    },
    selectPlayerId: (id) => {
      dispatch({ type: "SELECT_PLAYERID", payload: id });
    },
    setNextRoundNo: (round) => {
      dispatch({ type: "SET_NEXTROUNDNO", payload: round });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamRoster);
