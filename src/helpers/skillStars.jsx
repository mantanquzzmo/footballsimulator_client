import React from "react";

const skillStars = (skill, id) => {
  let stars = [];
  for (var i = 0; i < Math.floor(skill); i++) {
    stars.push(
      <span className="fa fa-star checked" key={`s + ${id}` + i}></span>
    );
  }
  return stars;
};

const formBars = (form, id) => {
  let bars = [];
  for (var i = 0; i < form; i++) {
    bars.push(<span key={`f + ${id}` + i}>&#10073;</span>);
  }
  return bars;
};

const formTendencyArrow = (formTendency, id) => {
  switch (true) {
    case formTendency === 1:
      return <span className="formTendency" key={`ft + ${id}`}>&#8595;</span>
    case formTendency === 2:
      return <span className="formTendency" key={`ft + ${id}`}>&#8600;</span>
    case formTendency === 3:
      return <span className="formTendency" key={`ft + ${id}`}>&#8594;</span>
    case formTendency === 4:
      return <span className="formTendency" key={`ft + ${id}`}>&#8599;</span>
    case formTendency === 5:
      return <span className="formTendency" key={`ft + ${id}`}>&#8593;</span>
    default:
      return "error"
  }
};

export { skillStars, formBars, formTendencyArrow };
