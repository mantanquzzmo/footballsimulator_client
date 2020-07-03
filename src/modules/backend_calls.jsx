import axios from "axios";
import { getAuthHeaders } from '../modules/getAuthHeaders.jsx'

const requestTeam = async (name, primaryColor, secondaryColor) => {
  debugger
  try {
    const response = await axios({
      method: "POST",
      url: "api/teams",
      params: {
        name: name,
        primary_color: primaryColor,
        secondary_color: secondaryColor },
      headers: {
        "access-token" : localStorage.getItem('access-token'),
        "token-type" : "Bearer"
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export { requestTeam };
