import React, { useState } from "react";
import { connect } from "react-redux";
import { requestTeam, patchTeam } from "../modules/backend_calls.jsx";
import { drawShirt } from "../helpers/drawShirt";

const Teams = (props) => {
  const [visibility, setVisibility] = useState("hidden");
  const createTeam = async (e) => {
    e.preventDefault();
    const teamName = e.target.teamName.value;
    const primaryColor = e.target.primaryColor.value;
    const secondaryColor = e.target.secondaryColor.value;

    const team = await requestTeam(teamName, primaryColor, secondaryColor);
    if (team.error) {
      props.changeMessage(team.error);
    } else {
      props.createdTeamInfo(team.data[0]);
      props.createdPlayersInfo(team.data[1]);
      props.createTeamProgression(1);
      drawShirt(primaryColor, secondaryColor);
    }
  };

  const updateTeam = async (e) => {
    e.preventDefault();
    let teamName;
    let primaryColor;
    let secondaryColor;
    if (e.target.teamName2.value) {
      teamName = e.target.teamName2.value;
    }
    if (e.target.teamName2.value) {
      primaryColor = e.target.primaryColor2.value;
    }
    if (e.target.teamName2.value) {
      secondaryColor = e.target.secondaryColor2.value;
    }
    debugger;

    const updatedTeam = await patchTeam(
      teamName,
      primaryColor,
      secondaryColor
    );
    if (updatedTeam.message === "Request failed with status code 422") {
      props.changeMessage(updatedTeam.message);
    } else {
      debugger;
      props.createdTeamInfo(updatedTeam.data[0]);
      drawShirt(primaryColor, secondaryColor);
      setVisibility("hidden");
    }
  };

  return (
    <div className="createTeam">
      {props.teamProgression === undefined && (
        <div>
          <form onSubmit={(e) => createTeam(e)}>
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
              setVisibility("visible");
            }}
          >
            Edit team colors
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
