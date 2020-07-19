import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPlayer, trainPlayer } from "../modules/backend_calls.jsx";
import { skillStars, formBars, formTendencyArrow } from "../helpers/skillStars";

const PlayerBio = (props) => {
  const [player, setPlayer] = useState(null);
  const [skill, setSkill] = useState(null);
  const [form, setForm] = useState(null);
  const [formArrow, setFormArrow] = useState(null);
  const [message, setMessage] = useState(null)

  const loadPlayer = async () => {
    const player = await getPlayer(props.playerId);
    if (player.message === "Request failed with status code 404") {
      setMessage(player.message)
    } else {
      setSkill(skillStars(player[0].skill));
      setForm(formBars(player[0].form));
      setFormArrow(formTendencyArrow(player[0].form_tendency));
      setPlayer(player[0]);
    }
  };

  const playerTraining = async () => {
    const training = await trainPlayer(props.playerId)
    debugger
  }

  useEffect(() => {
    loadPlayer();
  }, []);

  return (
    <div>
      {/* {message} */}
      {player && (
        <div className="playerBio">
          {player.name}
          {player.age}
          {player.position}
          {skill}
          {form}
          {formArrow}
          <button onClick={() => {
            playerTraining()}}>Go train! 15dra:-</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    playerId: state.footballsimulator.playerId,
    message: state.footballsimulator.message
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
    changeMessage: (message) => {
      dispatch({ type: "ADD_MESSAGE", payload: message });
    },
  };
};

export default 
  connect(mapStateToProps, mapDispatchToProps)(PlayerBio)

