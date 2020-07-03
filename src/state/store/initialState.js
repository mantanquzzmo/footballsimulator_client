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
}

const footballState = {
  teamName: null,
  primaryColor: null,
  secondaryColor: null,
  teamPlayers: null,
}

export default { initialState, footballState }
