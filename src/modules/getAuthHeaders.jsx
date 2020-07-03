import store from '../state/store/configureStore'

export const getAuthHeaders = () => {
  debugger
  return store.getState().authToken.data;
};