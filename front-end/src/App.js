import React, { useState } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/Auth";

import Login from './routes/Login.js';
import Home from './routes/Home.js';
import RequestCreation from './routes/RequestCreation';

import { Button } from 'rsuite';


function App() {
  const [ count, setCount ] = useState(0);
  return (
      <AuthProvider>
        <Router>
            <div>
                <PrivateRoute exact path= "/" component={Home} />
                <Route exact path= "/login" component={Login} />
                <Route exact path= "/requestCreation" component={RequestCreation} />  // Should eventually be made into a PrivateRoute
            </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
