import React from "react";

const Question = ({ question, img }) => {
  return (
    <div className="card m-auto mt-5">
      <h2 className="py-4">{question}</h2>
      <img className="image-fluid" src={img} alt={question} />
    </div>
  );
};

export default Question;
