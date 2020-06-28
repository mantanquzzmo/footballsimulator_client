import React from 'react';
import { connect } from "react-redux";
import RegisterScreen from './components/RegisterScreen'
import SignInScreen from './components/SignInScreen'

function App() {

  return (
    <>
    <RegisterScreen /> 
    <SignInScreen />
    </>
  );
}

const mapStateToProps = state => {
	return {
		first_state: state.first_state
	};
};

export default connect(
	mapStateToProps)(App);
