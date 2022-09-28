import React from "react";

const AuthContext = React.createContext();

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(`Wrap your component with AuthProvider`);
  }

  return context;
};

const initialState = {
  user: null,
};

function AuthProvider(props) {
  const [state, setState] = React.useState(initialState);

  const saveUserInfo = (key, data) => {
    setState({
      user: data,
    });
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  const deleteUserInfo = (key) => {
    setState({
      user: null,
    });
    window.localStorage.removeItem(key);
  };

  return (
    <AuthContext.Provider value={{ ...state, saveUserInfo, deleteUserInfo }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
