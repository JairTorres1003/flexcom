import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authProvider';

const PrivateRoute = ({ component: Component }, props) => {
  const { user } = useContext(AuthContext);

  return (
    user ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" />
    )
  );
}

export default PrivateRoute;
