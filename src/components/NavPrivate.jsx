import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../functions/functions";
const NavPrivate = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/private/home">
          Sistema experto
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/private/home">
                Reporte de Pacientes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/private/register">
                Registrar Paciente
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavPrivate;
