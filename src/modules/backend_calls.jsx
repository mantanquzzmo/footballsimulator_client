import axios from "axios";
import { getAuthHeaders } from "./auth_headers";

const requestTeam = async (name, primaryColor, secondaryColor) => {
  try {
    const response = await axios({
      method: "POST",
      url: "api/teams",
      params: {
        name: name,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
      },
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const patchTeam = async (name, primaryColor, secondaryColor, teamId) => {
  try {
    const response = await axios({
      method: "PUT",
      url: `api/teams/${teamId}`,
      params: {
        name: name,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
      },
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getPlayer = async (id) => {
  try {
    const response = await axios({
      method: "GET",
      url: `api/players/${id}`,
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {

    return error
  }
}
export { requestTeam, patchTeam, getPlayer };
