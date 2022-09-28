import {
  ApolloClient,
  ApolloProvider,
  gql,
  HttpLink,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./contexts/authContext";
import "./scss/style.scss";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://localhost:5001/graphql",
  }),
  credentials: "same-origin",
});

function App() {
  const { saveUserInfo, user } = useAuth();

  useEffect(() => {
    if (user === null) {
      const userInfo = window.localStorage.getItem("userInfo");
      if (userInfo !== null) {
        try {
          saveUserInfo("userInfo", JSON.parse(userInfo));
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [saveUserInfo, user]);

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
