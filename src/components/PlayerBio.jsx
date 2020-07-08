import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPlayer } from "../modules/backend_calls.jsx";
import { skillStars, formBars, formTendencyArrow } from "../helpers/skillStars";

const PlayerBio = (props) => {
  const [player, setPlayer] = useState(null);
  const [skill, setSkill] = useState(null);
  const [form, setForm] = useState(null);
  const [formArrow, setFormArrow] = useState(null);

  const loadPlayer = async () => {
    const player = await getPlayer(props.playerId);
    if (player.error) {
      props.changeMessage(player.error);
    } else {
      setSkill(skillStars(player.skill));
      setForm(formBars(player.form));
      setFormArrow(formTendencyArrow(player.form_tendency));
      setPlayer(player);
    }
  };

  useEffect(() => {
    loadPlayer();
  });

  return (
    <div>
      {player && (
        <div className="playerBio">
          {player.name}
          {player.age}
          {player.position}
          {skill}
          {form}
          {formArrow}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    playerId: state.footballsimulator.playerId,
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
  };
};

export default 
  connect(mapStateToProps, mapDispatchToProps)(PlayerBio)

