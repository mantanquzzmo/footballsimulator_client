import { combineReducers } from "redux";
import { reduxTokenAuthReducer } from "redux-token-auth";
import footballState from "../store/initialState";

const footballReducer = (state = footballState, action) => {
  switch (action.type) {
    case "LOAD_TEAM":
      return {
        ...state,
        teamId: action.payload.id,
        teamName: action.payload.name,
        primaryColor: action.payload.primary_color,
        secondaryColor: action.payload.secondary_color,
        balance: action.payload.balance,
      };
    case "LOAD_PLAYERS":
      return {
        ...state,
        teamPlayers: action.payload,
      };
    case "LOAD_SEASON":
      if (action.payload === null) {
        let fakePayLoad = { round: -1 };
        return {
          ...state,
          seasonInfo: fakePayLoad,
        };
      } else {
        return {
          ...state,
          seasonInfo: action.payload,
        };
      }
    case "INCREASE_PROGRESSION":
      return {
        ...state,
        teamProgression: action.payload,
      };
    case "SELECT_PLAYERID":
      return {
        ...state,
        playerId: action.payload,
      };
    case "SELECT_TEAMID":
      return {
        ...state,
        teamId: action.payload,
      };
    case "RESET_CREATION":
      return {
        ...state,
        teamProgression: action.payload,
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "SET_STANDINGS":
      return {
        ...state,
        seasonStandings: action.payload,
      };
    case "LOAD_ROUND":
      return {
        ...state,
        roundResults: action.payload,
        seasonInfo: { round: action.payload[0].round },
      };
      case "SET_NEXTROUNDNO":
        return {
          ...state,
          nextRoundNo: action.payload
        };
    default:
      return {
        ...state,
      };
  }
};

const rootReducer = combineReducers({
  reduxTokenAuth: reduxTokenAuthReducer,
  footballsimulator: footballReducer,
});

export default rootReducer;
