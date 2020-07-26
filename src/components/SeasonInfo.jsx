import React, { useEffect } from "react";
import { connect } from "react-redux";

const SeasonInfo = (props) => {

  const loadSeasonStandings = async () => {
    
  }


  useEffect(() => {
    loadSeasonStandings();
  }, []);

  return <div className="leagueTable"></div>;
};

const mapStateToProps = (state) => {
  return {
    seasonInfo: state.footballsimulator.seasonInfo,
    seasonStandings: state.footballsimulator.seasonStandings
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTeamInfo: (team) => {
      dispatch({ type: "LOAD_TEAM", payload: team });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonInfo);
