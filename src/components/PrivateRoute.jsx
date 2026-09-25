import {
    Navigate,
    Outlet,
  } from "react-router-dom";
  
  import { getToken } from "../lib/auth";
  
  
  function PrivateRoute() {
    return getToken()
      ? <Outlet />
      : <Navigate to="/login" replace />;
  }
  
  
  export default PrivateRoute;
