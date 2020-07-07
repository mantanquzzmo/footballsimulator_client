import React from "react";

export const skillStars = (skill, id) => {
  let stars = []
  for (var i = 0; i < Math.floor(skill); i++) {
    stars.push(<span className="fa fa-star checked" key={`${id}` + i}></span>)
  }
  return stars
};

