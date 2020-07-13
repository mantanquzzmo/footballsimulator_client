import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTeam } from "../modules/backend_calls.jsx";
import { skillStars, formBars, formTendencyArrow } from "../helpers/skillStars";
import { Link } from "react-router-dom";

const TeamRoster = (props) => {
  debugger
  const [players, setPlayers] = useState(null);

  const fetchTeam = async () => {
    const team = await getTeam(props.teamId);
    if (team.error) {
      props.changeMessage(team.error);
    } else {
      props.createdTeamInfo(team[0]);
      props.createdPlayersInfo(team[1]);
      props.createTeamProgression(1);
      setPlayers(
        team[1].map((player) => {
          let stars = skillStars(player.skill, player.id);
          let form = formBars(player.form, player.id);
          let formTendency = formTendencyArrow(player.form_tendency, player.id);
          return (
            <div id={player.id} key={"name" + player.id}>
              <div className="playerBio">
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
            </div>
          );
        })
      );
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div>
      TeamRoster
      {players}
    </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createdTeamInfo: (team) => {
      dispatch({ type: "LOAD_TEAM", payload: team });
    },
    createdPlayersInfo: (players) => {
      dispatch({ type: "LOAD_PLAYERS", payload: players });
    },
    createTeamProgression: (value) => {
      dispatch({ type: "INCREASE_PROGRESSION", payload: value });
    },
    selectPlayerId: (id) => {
      dispatch({ type: "SELECT_PLAYERID", payload: id });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamRoster);
