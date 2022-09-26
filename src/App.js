import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./scss/style.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route
          exact
          path="/register"
          name="Login Page"
          element={<Register />}
        />
        <Route exact path="*" name="Home Page" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
