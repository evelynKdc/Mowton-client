import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { LoginForm } from "../components/forms/LoginForm";
export const LoginPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
      if (token) {
        navigate("/");
      }
    }, [token]);
    return <LoginForm />;
}
