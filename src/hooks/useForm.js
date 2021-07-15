import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../functions/functions";
import axios from "axios";
import Swal from "sweetalert2";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
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
      const { data } = await axios.post(
        "https://se-fronted.herokuapp.com/auth/sigin",
        values
      );
      const { token, name, roll } = data.auth;
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Bienvenido " + name,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(login({ token, roll }));
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Correo o contraseña incorrectos",
      });
    }
  };
  return [values, handleInputChange, handleSubmit];
};
