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

import { createGlobalStyle } from "styled-components"
import { isStyledComponent } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body{
    height:100%
  }

  #app div{
    height:100%
  }
`;

function App() {
  const [state, dispatch] = useReducer(dataReducer, initialDataState);
  return (
    <div>
      <GlobalStyles />
        <AuthProvider>
          <DataContext.Provider value={{ state, dispatch }}>
            <Router>
              <div>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/profileEdit" component={ProfileEdit} />
                <Route exact path="/profile" component={Profile} />
              </div>
            </Router>
          </DataContext.Provider>
        </AuthProvider>
    </div>
  );
}

export default App;
