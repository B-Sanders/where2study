import React, { useReducer } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from "./auth/PrivateRoute";
import { initialDataState } from './state/initial-state';
import { dataReducer } from './state/reducer';
import { AuthProvider } from "./auth/Auth";
import { DataContext } from './state/context'

import Login from './routes/Login';
import Home from './routes/Home/index';
import Profile from './routes/Profile/Profile';
import ProfileEdit from './routes/Profile/ProfileEdit';


function App() {
  const [state, dispatch] = useReducer(dataReducer, initialDataState);
  return (
      <AuthProvider>
        <Router>
            <div>
                <Route exact path= "/" component={Home} />
                <Route exact path= "/login" component={Login} />
                <Route exact path= "/profile" component={Profile} />
                <Route exact path= "/profile-edit" component={ProfileEdit} />
            </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
