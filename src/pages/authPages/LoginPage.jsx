
import { LoginForm } from "../../components/forms/LoginForm";
export const LoginPage = () => {
 

    return <div className="authContainer">
    <div className="textContainer">
      <h2 className="welcomeTxt">¡De vuelta en la comunidad Mowton!</h2>
      <p className="sloganTxt">Donde las lineas de codigo forman lazos...</p>
    </div>
    <LoginForm />
  </div>;
}
