import React, { useState } from "react";
import { connect } from "react-redux";
import { requestTeam, patchTeam, getTeam } from "../modules/backend_calls.jsx";
import { drawShirt } from "../helpers/drawShirt";
import { skillStars, formBars, formTendencyArrow } from "../helpers/skillStars";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

const CreateTeam = (props) => {
  const [visibility, setVisibility] = useState("hidden");
  const [players, setPlayers] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const createTeam = async (e) => {
    e.preventDefault();
    let modal = document.getElementById("loadingModal");
    modal.style.display = "block";
    if (e.target.teamName.value === "" || e.target.primaryColor.value === "") {
      window.alert("Name AND primary color is mandatory");
    } else {
      const teamName = e.target.teamName.value;
      const primaryColor = e.target.primaryColor.value;
      const secondaryColor = e.target.secondaryColor.value;

      const response = await requestTeam(
        teamName,
        primaryColor,
        secondaryColor
      );
      if (response.message === "Network Error") {
        setErrorMessage("Network Error");
      } else {
        const team = await getTeam(response.data[0].id);
        if (team.message === "Network Error") {
          setErrorMessage("Network Error");
        } else {
          props.setTeamInfo(team[0]);
          props.setPlayersInfo(team[1]);
          props.setSeasonInfo(team[2]);
          props.setTeamProgression(1);
          drawShirt(primaryColor, secondaryColor, "teamColors");
          setPlayers(
            team[1].map((player) => {
              let stars = skillStars(player.skill, player.id);
              let form = formBars(player.form, player.id);
              let formTendency = formTendencyArrow(
                player.form_tendency,
                player.id
              );
              return (
                <>
                  <div className="playerBio" key={"name" + player.id}>
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
                </>
              );
            })
          );
          modal.style.display = "none";
        }
      }
    }
  };

  const updateTeam = async (e) => {
    e.preventDefault();
    let teamName = e.target.teamName2.value;
    let primaryColor = e.target.primaryColor2.value;
    let secondaryColor = e.target.secondaryColor2.value;

    const updatedTeam = await patchTeam(
      teamName,
      primaryColor,
      secondaryColor,
      props.teamId
    );

    if (updatedTeam.message === "Request failed with status code 422") {
      console.log("Patch failed");
    } else {
      props.setTeamInfo(updatedTeam.data);
      drawShirt(primaryColor, secondaryColor, "teamColors");
      setVisibility("hidden");
    }
  };

  return (
    <>
      <div className="createTeam">
        {errorMessage}
        {props.teamProgression === undefined && (
          <div>
            <form name="teamForm" onSubmit={(e) => createTeam(e)}>
              TeamName:
              <input name="teamName" id="teamName"></input>
              Primary Color:
              <input name="primaryColor" id="primaryColor"></input>
              Secondary Color:
              <input name="secondaryColor" id="secondaryColor"></input>
              <button id="teamSubmit">submit your team</button>
            </form>
          </div>
        )}
        {props.teamProgression === 1 && (
          <div>
            TeamName:
            {props.teamName}
            Primary Color:
            {props.primaryColor}
            Secondary Color:
            {props.secondaryColor}
            <canvas id="teamColors"></canvas>
            <button
              onClick={() => {
                if (visibility === "hidden") {
                  setVisibility("visible");
                } else {
                  setVisibility("hidden");
                }
              }}
            >
              Edit team colors
            </button>
            <button
              id="proceedToTeam"
              onClick={() => {
                props.setTeamProgression(2);
              }}
            >
              See your squad
            </button>
            <div style={{ visibility: visibility }}>
              <form onSubmit={(e) => updateTeam(e)}>
                TeamName:
                <input
                  name="teamName2"
                  id="teamName2"
                  placeholder={props.teamName}
                ></input>
                Primary Color:
                <input
                  name="primaryColor2"
                  id="primaryColor2"
                  placeholder={props.primaryColor}
                ></input>
                Secondary Color:
                <input
                  name="secondaryColor2"
                  id="secondaryColor2"
                  placeholder={props.secondaryColor}
                ></input>
                <button id="teamSubmit">submit your team</button>
              </form>
            </div>
          </div>
        )}
        {props.teamProgression === 2 && <Redirect to="/" />}
      </div>

      <div id="loadingModal" className="modal">
        <div className="canvas canvas5">
          <div className="spinner5"></div>
        </div>
      </div>
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
    seasonId: state.footballsimulator.seasonId,
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
    setTeamProgression: (value) => {
      dispatch({ type: "INCREASE_PROGRESSION", payload: value });
    },
    selectPlayerId: (id) => {
      dispatch({ type: "SELECT_PLAYERID", payload: id });
    },
    setSeasonInfo: (season) => {
      dispatch({ type: "LOAD_SEASON", payload: season });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
