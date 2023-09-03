import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const {login } = useAuth();
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
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
    const data = { name, lastName, email, password };
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/register",
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
      <div>
      <input type="text" name="name" onChange={handleChangeName} value={name} />
      <input
        type="text"
        name="lastname"
        onChange={handleChangeLastName}
        value={lastName}
      />
      </div>
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
      <Link to="/login">Ya soy parte de Mowton</Link>
      <button type="submit">Registrarse</button>

      {errors && errors.map((err, index) => <li key={index}>{err.path} : {err.msg}</li>)}
    </form>
  );
};
