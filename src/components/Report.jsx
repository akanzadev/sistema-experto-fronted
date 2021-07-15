import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import Evaluation from "./Evaluation";

const Report = () => {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    loadEvaluationOfUser();
  }, []);
  const loadEvaluationOfUser = async (id) => {
    const { token } = JSON.parse(window.localStorage.getItem("token"));
    let idUser;
    jwt.verify(token, "SEED", function (err, { id }) {
      idUser = id;
    });
    const { data } = await axios.get(
      `https://se-backend-app.herokuapp.com/evaluations/user/${idUser}`
    );
    const { evaluations } = data;
    setEvaluations(evaluations.reverse());
  };

  return (
    <div className="report">
      <h1 className="report__title">Resultados de Consultas</h1>
      <div className="report__content">
        {evaluations &&
          evaluations.map((evaluation, index) => (
            <Evaluation
              key={evaluation._id}
              evaluation={evaluation}
              index={index}
            />
          ))}
        {evaluations.length === 0 && (
          <p className="alert alert-primary">No hay ninguna evaluación</p>
        )}
      </div>
    </div>
  );
};

export default Report;
