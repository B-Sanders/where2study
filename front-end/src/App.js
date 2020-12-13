import React, { useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { initialDataState } from "./state/initial-state";
import { dataReducer } from "./state/reducer";
import { AuthProvider } from "./auth/Auth";
import { DataContext } from "./state/context";

import Login from "./routes/Login.js";
import Signup from "./routes/Signup";
import ProfileEdit from "./routes/Profile/ProfileEdit.js";
import Profile from "./routes/Profile/Profile.js";
import HomePage from "./routes/Home/Homepage.js";
import Locations from "./routes/Locations/LocationsPage";
import AccountRecovery from "./routes/account-recovery";

function App() {
  const [state, dispatch] = useReducer(dataReducer, initialDataState);
  return (
    <AuthProvider>
      <DataContext.Provider value={{ state, dispatch }}>
        <Router>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/locations" component={Locations} />
          <PrivateRoute exact path="/profileEdit" component={ProfileEdit} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/account-recovery" component={AccountRecovery} />
          <Route exact path="/signup" component={Signup} />
        </Router>
      </DataContext.Provider>
    </AuthProvider>
  );
}

export default App;
