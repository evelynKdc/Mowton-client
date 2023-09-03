import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RegisterForm } from "../components/forms/RegisterForm";
import { useEffect } from "react";

export const RegisterPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return <RegisterForm />;
};
