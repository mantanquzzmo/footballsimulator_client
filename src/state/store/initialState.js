const initialState = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        email: null,
      },
    },
  },
  // All other states
}

export default initialState;
