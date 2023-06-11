import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  console.log(location);
  console.log(children);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }else{
    return children;
  }

 
};

export default PrivateRoute;