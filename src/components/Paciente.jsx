import React from "react";

const Paciente = ({ paciente, loadEvaluationOfUser }) => {
  return (
    <>
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Nombre: {paciente.name}</h5>
            <p className="card-text">Apellidos: {paciente.lastname}</p>
            <p className="card-text">DNI: {paciente.dni}</p>
            <p className="card-text">Edad: {paciente.age}</p>
            {/* Button trigger modal */}
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                loadEvaluationOfUser(paciente._id);
              }}
            >
              Ver evaluaciones
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paciente;
