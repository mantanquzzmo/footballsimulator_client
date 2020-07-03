import React, { useState } from "react";
import { connect } from "react-redux";
import { requestTeam } from "../modules/backend_calls.jsx";
import store from '../state/store/configureStore'

const Teams = (props) => {
  const [teamName, setTeamName] = useState(null);
  const [primaryColor, setPrimaryColor] = useState(null);
  const [secondaryColor, setSecondaryColor] = useState(null);


  const createTeam = async () => {
    const team = await requestTeam(teamName, primaryColor, secondaryColor);
    debugger;
    if (team.error) {
      props.changeMessage(team.error);
    } else {
      props.loadedTeamInfo(team);
    }
  };

  return (
    <div>
      TeamName:
      <input
        name="teamName"
        id="teamName"
        onChange={(name) => {
          setTeamName(name);
        }}
      ></input>
      Primary Color:
      <input
        name="primaryColor"
        id="primaryColor"
        onChange={(color) => {

          setPrimaryColor(color);
        }}
      ></input>
      Secondary Color:
      <input
        name="secondaryColor"
        id="secondaryColor"
        onChange={(color) => {

          setSecondaryColor(color);
        }}
      ></input>
      <button
        id="submit"
        onClick={() => {
          debugger;
          createTeam()
        }}
      >
        submit
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadedTeamInfo: (team) => {
      dispatch({ type: "LOAD_TEAM", payload: team });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
