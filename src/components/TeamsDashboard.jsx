import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTeams } from "../modules/backend_calls.jsx";
import TeamRoster from "./TeamRoster.jsx";
import { drawShirt } from "../helpers/drawShirt";

const TeamsDashboard = (props) => {
  const [modalTeams, setModalTeams] = useState(null);
  let currentView;

  const fetchTeams = async () => {
    let modal = document.getElementById("myModal");
    let teams = await getTeams();
    if (teams.isAxiosError) {
      console.log("You must create a team"); // use modal to create team
    } else if (teams.length === 1) {
      props.selectTeamId(teams[0].id);
    } else if (props.teamId === undefined) {
      modal.style.display = "block";
      setModalTeams(
        teams.map((team) => {
          return (
            <div
              className="teamOfChoice"
              key={"team" + team.id}
              onClick={(event) => {
                props.selectTeamId(event.target.id);
                modal.style.display = "none";
              }}
            >
              {team.name}
              <br />
              {team.id}
              <canvas id={team.id + "canvas"}></canvas>
            </div>
          );
        })
      );

      for (var i = 0; i < teams.length; i++) {
        drawShirt(
          teams[i].primary_color,
          teams[i].secondary_color,
          teams[i].id + "canvas"
        );
      }
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  switch (true) {
    case props.teamId === undefined:
      currentView = (
        <>
          <div className="currentView">
            <div id="myModal" className="modal">
              <span className="close">&times;</span>
              <div className="modal-content">{modalTeams && modalTeams}</div>
            </div>
          </div>
        </>
      );
      break;
    case props.teamId !== undefined:
      currentView = <TeamRoster />;
      break;

    default:
      currentView = <div>Loading</div>;
      return <div className="currentView"></div>;
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
    selectTeamId: (id) => {
      dispatch({ type: "SELECT_TEAMID", payload: id });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsDashboard);
