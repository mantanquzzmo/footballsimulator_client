import axios from "axios";
import { getAuthHeaders } from "./getAuthHeaders";

const requestTeam = async (name, primaryColor, secondaryColor, uid) => {
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
    debugger
    return response;
  } catch (error) {
    return error;
  }
};

export { requestTeam };
