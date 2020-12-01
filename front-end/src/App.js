import React, { useReducer } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from "./auth/PrivateRoute";
import { initialDataState } from './state/initial-state';
import { dataReducer } from './state/reducer';
import { AuthProvider } from "./auth/Auth";
import { DataContext } from './state/context' 

import Login from './routes/Login.js';
import Home from './routes/Home.js';

function App() {
  const [state, dispatch] = useReducer(dataReducer, initialDataState);
  return (
      <AuthProvider>
        <DataContext.Provider value={{ state, dispatch }}>
          <Router>
              <div>
                  <PrivateRoute exact path= "/" component={Home} />
                  <Route exact path= "/login" component={Login} />
              </div>
          </Router>
        </DataContext.Provider>
      </AuthProvider>
  );
}

export default App;
