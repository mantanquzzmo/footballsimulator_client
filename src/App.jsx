import React from 'react';
import { connect } from "react-redux";
import RegisterScreen from './components/RegisterScreen'

function App() {
  return (
    <RegisterScreen /> 
  );
}

const mapStateToProps = state => {
	return {
		first_state: state.first_state
	};
};

export default connect(
	mapStateToProps)(App);
