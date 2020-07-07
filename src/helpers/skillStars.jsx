import React from "react";

const skillStars = (skill, id) => {
  let stars = [];
  for (var i = 0; i < Math.floor(skill); i++) {
    stars.push(<span className="fa fa-star checked" key={`s + ${id}` + i}></span>);
  }
  return stars;
};

const formBars = (form, id) => {
  let bars = []
  for (var i = 0; i < form; i++) {
    bars.push(<span key={`f + ${id}` + i}>&#10073;</span>);
  }
  return bars;
};

export { skillStars, formBars };
