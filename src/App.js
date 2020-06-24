import React from 'react';
import { connect } from "react-redux";

function App() {
  return (
    <div className="App">
      <p> Hello FootballSimulatorWorld</p>
      <div className="loginDiv">
        <button>Login</button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
	return {
		first_state: state.first_state
	};
};

export default connect(
	mapStateToProps)(App);
