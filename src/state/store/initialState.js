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
  auth: null,
}

export default initialState;
