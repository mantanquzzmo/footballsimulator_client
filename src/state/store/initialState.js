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
  teamId: null,
  teamName: null,
  primaryColor: null,
  secondaryColor: null,
  teamPlayers: null,
  teamProgression: 0,
  playerId: null,
  balance: null,
  seasonProgression: null,
  seasonInfo: null,
  seasonStandings: null,
  nextRoundNo: 0
}

export default { initialState, footballState }
