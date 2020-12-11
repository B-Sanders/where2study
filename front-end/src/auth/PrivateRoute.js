import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';


const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const { currentUser, isLoading } = useContext(AuthContext);
    return (
      <>
        {isLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}></div> :
        <Route
            {...rest}
            render={routeProps =>
            !!currentUser ? (
                <RouteComponent {...routeProps} />
            ) : (
                <Redirect to="/login"/>
            )}
        />}
      </>
    );
};

export default PrivateRoute;