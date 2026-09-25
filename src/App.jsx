import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./lib/auth";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import CallbackPage from "./pages/CallbackPage";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/oauth/callback"
        element={<CallbackPage />}
      />

      <Route
        element={<PrivateRoute />}
      >

        <Route
          path="/home"
          element={<HomePage />}
        />
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to={
              getToken()
                ? "/home"
                : "/login"
            }
            replace
          />
        }
      />

    </Routes>
  );
}


export default App;
