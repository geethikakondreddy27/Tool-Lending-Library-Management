import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

import { login as loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setServerError("");

      console.log("[Telemetry] User attempted login");

      const response = await loginUser(formData);

      login(response.data.user, response.data.token);

      console.log("[Telemetry] Login successful");

      if (response.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/tools");
      }
    } catch (error) {
      console.error(error);

      setServerError(error.response?.data?.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <Card>
        <div className="login-header">
          <h1>Tool Lending Library</h1>

          <p>Inventory Management System</p>
        </div>

        {serverError && <div className="login-error">{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            register={register}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            error={errors.email}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            validation={{
              required: "Password is required",
            }}
            error={errors.password}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </Button>
        </form>

        <p className="login-footer">
          Accounts are managed by the system administrator.
        </p>
      </Card>
    </main>
  );
};

export default LoginPage;
