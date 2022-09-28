import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const userInfo = window.localStorage.getItem("userInfo");
  return userInfo !== null;
};

export function RequireAuth({ children, redirectTo }) {
  return isAuthenticated() ? children : <Navigate to={redirectTo} />;
}
