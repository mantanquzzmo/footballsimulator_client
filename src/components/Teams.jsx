import React from 'react'
import { connect } from 'react-redux'

const Teams = () => {


  return (
    <div>
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadedTeamInfo: team => {
      dispatch({ type: "CHANGE_TEAM", payload: team });
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Teams);