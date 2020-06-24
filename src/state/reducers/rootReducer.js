import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "first_example":
      return {
        ...state,
        first_state: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer; 