import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ToolsPage from "../pages/Tools/ToolsPage";
import RegisterStaffPage from "../pages/Register/RegisterStaffPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />

      <Route
        path="/tools"
        element={<ToolsPage />}
      />

      <Route
        path="/register-staff"
        element={<RegisterStaffPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>
  );
};

export default AppRoutes;