import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const loggedIn = window.localStorage.getItem('loginToken');
    return (
        <Route
            {...rest}
            render={routeProps =>
            !!loggedIn ? (
                <RouteComponent {...routeProps} />
            ) : (
                <Redirect to="/login"/>
            )
            }
        />
    )
};

export default PrivateRoute;