import React from "react";
import { useForm } from "../hooks/userFormUser";

const FormUser = () => {
  const [values, handleInputChange, handleSubmit] = useForm({
    email: "",
    password: "",
    age: "",
    dni: "",
    name: "",
    lastname: "",
  });
  return (
    <form className="col-lg-4 pt-4 m-auto col-sm-12" onSubmit={handleSubmit}>
      <h1>Crear usuarios</h1>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={handleInputChange}
          name="email"
          value={values.email}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          onChange={handleInputChange}
          name="password"
          value={values.password}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={handleInputChange}
          name="name"
          value={values.name}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={handleInputChange}
          name="lastname"
          value={values.lastname}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Dni
        </label>
        <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={handleInputChange}
          name="dni"
          value={values.dni}
          required
          maxLength="8"
          minLength="8"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Age
        </label>
        <input
          type="number"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={handleInputChange}
          name="age"
          value={values.age}
          required
        />
      </div>
      <button type="submit" className="btn mt-4 btn-outline-primary w-100">
        Crear
      </button>
    </form>
  );
};

export default FormUser;
