import React, { useState } from "react";
import { connect } from "react-redux";
import { requestTeam, patchTeam } from "../modules/backend_calls.jsx";
import { drawShirt } from "../helpers/drawShirt";