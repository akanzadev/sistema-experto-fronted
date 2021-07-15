import React, { useState, useEffect, useRef } from "react";
/* import data from "../helpers/data.json"; */
import { useHistory } from "react-router-dom";
import Question from "./Question";
import axios from "axios";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import pl from "tau-prolog";
const Quiz = () => {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [index, setIndex] = useState(1);
  const [res, setRes] = useState([]);
  const [evaluation, setEvaluation] = useState();
  const mounted = useRef(true);
  const [question, setQuestion] = useState();
  useEffect(() => {
    loadQuestions();
    return () => {
      mounted.current = false;
    };
  }, []);
  const loadQuestions = async () => {
    try {
      const { data } = await axios.get(
        "https://se-backend-app.herokuapp.com/questions"
      );
      const { questions } = data;
      if (mounted.current) {
        setQuestions(questions);
        setQuestion({
          id: questions[0]._id,
          question: questions[0].question,
          image: questions[0].image,
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cargar preguntas",
      });
    }
  };
  const handleNext = (value) => {
    setIndex(index + 1);
    if (value === 1) {
      setRes([...res, questions[index - 1].symptom]);
    }
    if (index === questions.length) {
    } else {
      setQuestion({
        id: questions[index]._id,
        question: questions[index].question,
        image: questions[index].image,
      });
    }
  };

  const loadResult = () => {
    try {
      // Tau prolog
      resolveWithTauProlog(res);
      setIndex(index + 1);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cargar resultados",
      });
    }
  };
  const saveResult = async () => {
    try {
      // Tau prolog
      const { token } = JSON.parse(window.localStorage.getItem("token"));
      let body = { diagnostic: "", user: "" };
      jwt.verify(token, "SEED", function (err, { id }) {
        body.user = id;
        body.diagnostic = evaluation;
      });
      await axios.post("https://se-backend-app.herokuapp.com/evaluation", body);
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Guardado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
      history.replace("/public/result");
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cargar resultados",
      });
    }
  };

  const resolveWithTauProlog = async (valuesTP) => {
    const session = pl.create(1000);
    const program = `
      % ENFERMEDADES
      enfermedad('Paperas',['DOLORCABEZA','FIEBRE','NOAPETITO'
      ,'NOCOMER','DOLOROIDO',-,-,-]).
      enfermedad('Varicela',['FIEBRE','TOS',-,-,-,-,-,-]).
      enfermedad('Anemia',['DOLORCABEZA','MAREOS',-,-,-,-,-,-]).
      enfermedad('Resfriado',['FIEBRE','CANSANCIO','NOCOMER',-,-,-,-,-]).
      enfermedad('Influenza',['FIEBRE','CANSANCIO','TOS',-,-,-,-,-]).
      enfermedad('Fatiga',['DOLORCABEZA','CANSANCIO',-,-,-,-,-,-]).
      enfermedad('Infeccion de estomago',['NOAPETITO','NOCOMER',
      'MAREOS',-,-,-,-,-]).
    `;
    let cadena = "enfermedad(X,['";
    const goal = (valores, n) => {
      for (let index = 0; index < valores.length; index++) {
        if (index === valores.length - 1) {
          cadena = cadena + valores[index] + "',";
        } else {
          cadena = cadena + valores[index] + "','";
        }
      }
      for (let index = 0; index < n - valores.length; index++) {
        if (index === n - valores.length - 1) {
          cadena = cadena + " _ ]).";
        } else {
          cadena = cadena + " _ , ";
        }
      }
      return cadena;
    };
    if (valuesTP.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Insuficientes datos para dar una respuesta",
      }).then((result) => {
        history.replace("/public/quiz");
      });
    }
    const goalres = goal(valuesTP, 8);
    let responseTp = "";
    session.consult(program, {
      success: function () {
        session.query(goalres, {
          success: function () {
            session.answer(async (x) => {
              let rekt = await session.format_answer(x);
              responseTp = rekt.slice(4, rekt.length - 1);
              setEvaluation(responseTp);
            });
          },
        });
      },
    });
  };
  return (
    <div className="quiz">
      {!showQuestions && (
        <div className="card w-50 m-auto mt-5" style={{ width: "18rem" }}>
          <img
            src="https://png.pngtree.com/png-clipart/20190120/ourlarge/pngtree-hospital-medical-doctors-cartoon-png-image_491853.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Empezar test</h5>
            <p className="card-text">Inicia un proceso de evaluacion ahora</p>
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                setShowQuestions(true);
              }}
            >
              Empezar
            </button>
          </div>
        </div>
      )}
      {showQuestions && (
        <div className="col-6">
          <h2>Preguntas</h2>
          <Question question={question.question} img={question.image} />
          {index !== questions.length + 1 && !evaluation && (
            <>
              <button
                className="btn btn-success w-50"
                onClick={() => handleNext(1)}
              >
                Sí
              </button>
              <button
                className="btn btn-danger w-50"
                onClick={() => handleNext(0)}
              >
                No
              </button>
            </>
          )}
          {index === questions.length + 1 && (
            <>
              <button className="btn btn-primary w-100" onClick={loadResult}>
                Enviar respuestas
              </button>
            </>
          )}
          {evaluation && (
            <>
              <button className="btn btn-primary w-100" onClick={saveResult}>
                Cargar resultados
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
