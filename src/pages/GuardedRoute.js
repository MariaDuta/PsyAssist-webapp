import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuardedRoute = ({ children, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return auth === true ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default GuardedRoute;
