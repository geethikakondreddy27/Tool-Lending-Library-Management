import api from "./api";

/**
 * Login
 */
export const login = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

/**
 * Register Staff
 */
export const registerStaff = async (staffData) => {
  const response = await api.post(
    "/auth/register",
    staffData
  );

  return response.data;
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};