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
  teamProgression: 0,
}

export default { initialState, footballState }
