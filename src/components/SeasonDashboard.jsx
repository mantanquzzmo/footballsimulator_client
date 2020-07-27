import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import LeagueTable from "./LeagueTable.jsx";
import MatchSchedule from "./MatchSchedule.jsx";

const SeasonDashboard = () => {
  return (
    <>
      <LeagueTable />
      <MatchSchedule />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    seasonInfo: state.footballsimulator.seasonInfo,
    seasonStandings: state.footballsimulator.seasonStandings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTeamInfo: (team) => {
      dispatch({ type: "LOAD_TEAM", payload: team });
    },
    setSeasonStandings: (season) => {
      dispatch({ type: "SET_STANDINGS", payload: season });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonDashboard);
