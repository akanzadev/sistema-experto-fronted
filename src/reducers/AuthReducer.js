import { types } from "../types/types";
const { token, roll } = JSON.parse(window.localStorage.getItem("token")) || {
  token: "",
  roll: "",
};
const initialState = {
  token,
  roll,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.login:
      return { ...state, ...payload };
    case types.logout:
      return { ...state, ...payload };
    default:
      return state;
  }
};
