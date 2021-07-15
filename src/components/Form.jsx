import React from "react";
import { useForm } from "../hooks/useForm";

const Form = () => {
  const [values, handleInputChange, handleSubmit] = useForm({
    email: "",
    password: "",
  });
  return (
    <form
      className="col-lg-4 pt-4 m-auto col-sm-8"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h2>Login</h2>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleInputChange}
          name="email"
          value={values.email}
          autoComplete="off"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={handleInputChange}
          name="password"
          value={values.password}
          autoComplete="off"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
