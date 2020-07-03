import React, { useState } from "react";
import { connect } from "react-redux";
import { requestTeam } from "../modules/backend_calls.jsx";
import store from "../state/store/configureStore";

const Teams = (props) => {

  const createTeam = async (e) => {
    e.preventDefault()
    const teamName = e.target.teamName.value
    const primaryColor = e.target.primaryColor.value
    const secondaryColor = e.target.secondaryColor.value

    const team = await requestTeam(teamName, primaryColor, secondaryColor, props.currentUser.attributes.email);
    if (team.error) {
      props.changeMessage(team.error);
    } else {
      props.loadedTeamInfo(team);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => createTeam(e)}>
        TeamName:
        <input
          name="teamName"
          id="teamName"
        ></input>
        Primary Color:
        <input
          name="primaryColor"
          id="primaryColor"
        ></input>
        Secondary Color:
        <input
          name="secondaryColor"
          id="secondaryColor"
        ></input>
        <button
          id="teamSubmit"          
        > submit your team
        </button>
      </form>
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
