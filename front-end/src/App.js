import React, { useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { initialDataState } from "./state/initial-state";
import { dataReducer } from "./state/reducer";
import { AuthProvider } from "./auth/Auth";
import { DataContext } from "./state/context";

import Login from "./routes/Login.js";
import Home from "./routes/Home.js";
import Signup from "./routes/Signup";
import ProfileEdit from "./routes/Profile/ProfileEdit.js";
import Profile from "./routes/Profile/Profile.js";
import HomePage from "./routes/Home/index.js";


function App() {
  const [state, dispatch] = useReducer(dataReducer, initialDataState);
  return (
   <>
    <AuthProvider>
      <DataContext.Provider value={{ state, dispatch }}>
        <Router>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profileEdit" component={ProfileEdit} />
            <Route exact path="/profile" component={Profile} />
        </Router>
      </DataContext.Provider>
    </AuthProvider>
  </>
  );
}

export default App;
