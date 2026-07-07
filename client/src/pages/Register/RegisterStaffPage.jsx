import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Toast from "../../components/common/toast";

import { useForm } from "react-hook-form";
import { registerStaff } from "../../services/authService";

const RegisterStaffPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "success",
        message: "",
      });
    }, 3000);
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      await registerStaff(formData);

      showToast("success", "Staff account created successfully.");

      reset();
    } catch (error) {
      console.error(error);

      showToast(
        "error",
        error?.response?.data?.message || "Unable to register staff.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Toast show={toast.show} type={toast.type} message={toast.message} />

      <h2 className="page-title">Register Staff</h2>

      <p className="page-subtitle">
        Create a new staff account for the Tool Lending Library.
      </p>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            id="fullName"
            label="Full Name"
            type="text"
            placeholder="Enter full name"
            register={register}
            validation={{
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters required",
              },
            }}
            error={errors.fullName}
          />

          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter email"
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
            placeholder="Enter password"
            register={register}
            validation={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters required",
              },
            }}
            error={errors.password}
          />

          <div className="password-rules">
            <strong>Password Requirements</strong>

            <ul>
              <li>✓ Minimum 8 characters</li>
              <li>✓ At least one uppercase letter</li>
              <li>✓ At least one lowercase letter</li>
              <li>✓ At least one number</li>
            </ul>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Register Staff"}
            </Button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </button>
          </div>
        </form>
      </Card>
    </MainLayout>
  );
};

export default RegisterStaffPage;
