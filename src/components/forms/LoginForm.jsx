import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { login } = useAuth();

  const navigate = useNavigate();
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const responseErrors = (errors) => {
    setErrors(errors);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        data
      );
      console.log(response.data);
      login(response.data.token);
      navigate("/");
    } catch (error) {
      // console.error(error.response.data.errors);
      responseErrors(error.response.data.errors);
      console.log(errors);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        onChange={handleChangeEmail}
        value={email}
      />
      <input
        type="password"
        name="password"
        onChange={handleChangePassword}
        value={password}
      />
      <Link to="/registro">Aun no tengo cuenta</Link>
      <button type="submit">Iniciar Sesion</button>
      {errors &&
        errors.map((err, index) => (
          <li key={index}>
            {err.path} : {err.msg}
          </li>
        ))}
    </form>
  );
};
