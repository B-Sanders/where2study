import React, { useState } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/Auth";

import Login from './routes/Login.js';
import Home from './routes/Home.js';
import SampleRequest from "./routes/SampleRequest";

import { Button } from 'rsuite';
import { Button, Modal } from 'rsuite';


// import Login from "./routes/LogIn";
// import SignUp from "./routes/SignUp";

function App() {
  const [ count, setCount ] = useState(0);
  return (
      <AuthProvider>
        <Router>
            <div>
                <PrivateRoute exact path= "/" component={Home} />
                <Route exact path= "/login" component={Login} />
                <Route exact path= "/SampleRequest" component={SampleRequest} />
            </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
