import React, { useState } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/Auth";

import Login from './routes/Login.js';
import Home from './routes/Home.js';
import ProfileEdit from './routes/ProfileEdit.js';
import Profile from './routes/Profile.js';


import { Button } from 'rsuite';


function App() {
  const [ count, setCount ] = useState(0);
  return (
      <AuthProvider>
        <Router>
            <div>
                <PrivateRoute exact path= "/" component={Home} />
                <Route exact path= "/login" component={Login} />
                <Route exact path= "/profileEdit" component={ProfileEdit} />
                <Route exact path= "/profile" component={Profile} />
            </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
