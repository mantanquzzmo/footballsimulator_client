import React, { useEffect } from "react";
import { connect } from "react-redux";

const SeasonEnding = (props) => {

  useEffect(() => {
    
  }, []);

  return <div className="seasonEnding">{props.seasonInfo.winner}</div>
};

const mapStateToProps = (state) => {
  return {
    seasonInfo: state.footballsimulator.seasonInfo
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

export default connect(mapStateToProps, mapDispatchToProps)(SeasonEnding);
