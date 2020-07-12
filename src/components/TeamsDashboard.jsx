import React, { useEffect } from "react";
import { connect } from "react-redux";
import { requestTeam, patchTeam, getTeams } from "../modules/backend_calls.jsx";
import { drawShirt } from "../helpers/drawShirt";
import { skillStars, formBars, formTendencyArrow } from "../helpers/skillStars";
import { Link } from "react-router-dom";
import CreateTeam from "./CreateTeam.jsx";
import TeamRoster from "./TeamRoster.jsx";

const TeamsDashboard = (props) => {
  // window.onclick = function (event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // };

  const fetchTeams = async () => {
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("myBtn");
    let span = document.getElementsByClassName("close")[0];

    let teams = await getTeams();
    if (teams.error) {
    } else {
      debugger
      modal.style.display = "block";
    }
  };

  useEffect(() => {
    fetchTeams();
  });

  let currentView;
  switch (true) {
    case props.teamId === undefined:
      currentView = (
        <>
          <CreateTeam />{" "}
          <div className="currentView">
            <div id="myModal" class="modal">
              <div className="modal-content">
                <p>Some text in the Modal..</p>
              </div>
            </div>
          </div>
        </>
      );
      break;
    case props.progression !== undefined:
      currentView = <TeamRoster />;
      break;

    default:
      currentView = <div>Loading</div>;
      return (
        <div className="currentView">
        </div>
      );
  }

  return currentView;
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamsDashboard);
