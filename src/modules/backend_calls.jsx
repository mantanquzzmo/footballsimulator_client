import axios from "axios";

const createTeam = async (name, primaryColor, secondaryColor) => {
  try {
    const response = await axios({
      method: "POST",
      url: "api/teams",
      params: {
        name: name,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export { createTeam };
