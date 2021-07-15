import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const history = useHistory();
  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setValues(values);
      // servicio de autenticación
      await axios.post("https://se-fronted.herokuapp.com/user", values);
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Creado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/home");
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al crear usuario",
      });
    }
  };
  return [values, handleInputChange, handleSubmit];
};
