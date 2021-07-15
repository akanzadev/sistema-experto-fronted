import React, { useEffect, useRef, useState } from "react";
import Paciente from "./Paciente";
import Modal from "./Modal";
import axios from "axios";
import Swal from "sweetalert2";

const Home = () => {
  const [pacientes, setPacientes] = useState([]);
  const mounted = useRef(true);
  useEffect(() => {
    loadUsers();
    return () => {
      mounted.current = false;
    };
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await axios.get("https://se-backend-app.herokuapp.com/users");

      const { users: pacientes } = data;
      if (mounted.current) {
        setPacientes(pacientes);
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cargar pacientes",
      });
    }
  };

  const [evaluations, setEvaluations] = useState([]);
  const loadEvaluationOfUser = async (id) => {
    const { data } = await axios.get(
      `https://se-backend-app.herokuapp.com/evaluations/user/${id}`
    );
    const { evaluations } = data;
    setEvaluations(evaluations.reverse());
  };

  return (
    <>
      <h1 className="pt-5">Reporte de Pacientes</h1>
      <div className="pt-3 row row-cols-1 row-cols-md-3 g-4">
        {pacientes.map((paciente) => (
          <Paciente
            key={paciente._id}
            paciente={paciente}
            loadEvaluationOfUser={loadEvaluationOfUser}
          />
        ))}
      </div>
      <Modal evaluations={evaluations} />
    </>
  );
};

export default Home;
