import React, { useState } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/Auth";

import Login from './routes/Login';
import Home from './routes/Home/index.js';


function App() {
  const [ count, setCount ] = useState(0);
  return (
      <AuthProvider>
        <Router>
            <div>
                <Route exact path= "/" component={Home} />
                <Route exact path= "/login" component={Login} />
            </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
