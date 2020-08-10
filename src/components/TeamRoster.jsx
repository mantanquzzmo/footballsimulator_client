import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTeam, putPlayer } from "../modules/backend_calls.jsx";
import { skillStars, formBars, formTendencyArrow } from "../helpers/skillStars";
import { Link } from "react-router-dom";

const TeamRoster = (props) => {
  const [starting11, setStarting11] = useState(null);
  const [substitutes, setSubstitutes] = useState(null);
  const [modalSubstitutes, setModalSubstitutes] = useState(null);
  const [modalPlayer, setModalPlayer] = useState(null);
  let substituteToStarting11Id = null;

  const subPlayer = async (playerId) => {
    let modal = document.getElementById("substituteModal");
    const response = await putPlayer(substituteToStarting11Id, playerId);
    if (response.status === 200) {
      modal.style.display = "none";
      setModalPlayer(null);
    } else {
      debugger;
    }
  };

  const fetchTeam = async () => {
    let modal = document.getElementById("substituteModal");
    const team = await getTeam(props.teamId);
    if (team.error) {
      props.changeMessage(team.error);
    } else {
      props.setTeamInfo(team[0]);
      props.setPlayersInfo(team[1]);
      if (team[2]) {
        props.setSeasonInfo(team[2]);
        props.setSeasonId(team[2].id);
      }
      props.setTeamProgression(1);
      setStarting11(
        team[1][0].map((player) => {
          let stars = skillStars(player.skill, player.id);
          let form = formBars(player.form, player.id);
          let formTendency = formTendencyArrow(player.form_tendency, player.id);
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
              <div className="inStartingEleven" key={"starting11" + player.id}>
                <button
                  onClick={() => {
                    substituteToStarting11Id = player.id;
                    modal.style.display = "block";
                    setModalPlayer(
                      <>
                        <div className="playerBio" key={player.id}>
                          {player.name}
                        </div>
                        <div className="playerAge" key={"age" + player.id}>
                          {player.age}
                        </div>
                        <div
                          className="playerPosition"
                          key={"position" + player.id}
                        >
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
                        <div
                          className="inStartingEleven"
                          key={"starting11" + player.id}
                        ></div>
                      </>
                    );
                    setModalSubstitutes(
                      team[1][1].map((player) => {
                        let stars = skillStars(player.skill, player.id);
                        let form = formBars(player.form, player.id);
                        let formTendency = formTendencyArrow(
                          player.form_tendency,
                          player.id
                        );
                        return (
                          <>
                            <div className="playerBio" key={player.id}>
                              {player.name}
                            </div>
                            <div className="playerAge" key={"age" + player.id}>
                              {player.age}
                            </div>
                            <div
                              className="playerPosition"
                              key={"position" + player.id}
                            >
                              {player.position}
                            </div>
                            <div
                              className="playerSkill"
                              key={"skill" + player.id}
                            >
                              {stars}
                            </div>
                            <div
                              className="playerForm"
                              key={"form" + player.id}
                            >
                              {form}
                            </div>
                            <div
                              className="playerFormTendency"
                              key={"formTendency" + player.id}
                            >
                              {formTendency}
                            </div>
                            <div
                              className="inStartingEleven"
                              key={"starting11" + player.id}
                            >
                              <button
                                id={player.id}
                                onClick={(event) => {
                                  subPlayer(event.target.id);
                                }}
                              >
                                Pick
                              </button>
                            </div>
                          </>
                        );
                      })
                    );
                  }}
                >
                  Substitute
                </button>
              </div>
            </>
          );
        })
      );
      setSubstitutes(
        team[1][1].map((player) => {
          let stars = skillStars(player.skill, player.id);
          let form = formBars(player.form, player.id);
          let formTendency = formTendencyArrow(player.form_tendency, player.id);
          let starting_11;
          if (player.starting_11 === true) {
            starting_11 = "yes";
          } else {
            starting_11 = "no";
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
              <div
                className="inStartingEleven"
                key={"starting11" + player.id}
              ></div>
            </>
          );
        })
      );
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [modalPlayer]);

  return (
    <>
      TeamRoster:
      <div className="player-grid">
        <p>Name:</p>
        <p>Age:</p>
        <p>Position:</p>
        <p>Skill:</p>
        <p>Form:</p>
        <p>Form tendency:</p>
        <p>Starting 11:</p>
        {starting11}
      </div>
      <div className="player-grid">
        {" "}
        <p>Name:</p>
        <p>Age:</p>
        <p>Position:</p>
        <p>Skill:</p>
        <p>Form:</p>
        <p>Form tendency:</p>
        <p>Starting 11:</p>
        {substitutes}
      </div>
      <>
        <div className="substitutePlayer">
          <div
            id="substituteModal"
            className="modal"
            onClick={() => {
              let modal = document.getElementById("substituteModal");
              modal.style.display = "none";
            }}
          >
            <span className="close">&times;</span>
            <div className="modal-content-main">
              <div className="modal-content-player">{modalPlayer}</div>
              <div className="modal-content-substitute">{modalSubstitutes}</div>
            </div>
          </div>
        </div>
      </>
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
    setSeasonId: (season) => {
      dispatch({ type: "SET_SEASONID", payload: season });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamRoster);
