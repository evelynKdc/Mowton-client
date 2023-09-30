
import { RegisterForm } from "../../components/forms/RegisterForm";
import "./authPage.css"
export const RegisterPage = () => {

  return <div className="authContainer">
    <div className="textContainer">
      <h2 className="welcomeTxt">¡Se parte de la comunidad Mowton!</h2>
      <p className="sloganTxt">Donde las lineas de codigo forman lazos...</p>
    </div>
    <RegisterForm />
  </div>;
};
