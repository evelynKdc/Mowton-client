import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { registerSchema } from "../../utils/validationSchemas";
import { registerUser } from "../../service/authService";
export const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await registerUser(values);
      login(response.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="formContainer">
          <div className="namesContainer">
            <div className="inputGroup">
              <label htmlFor="name" className="labelInput">
                Nombre
              </label>
              <Field type="text" name="name" className="txtInput" />
              <div className="errorMessage">
                <ErrorMessage name="name" component="span" />
              </div>
            </div>

            <div className="inputGroup">
              <label htmlFor="lastName" className="labelInput">
                Apellido
              </label>
              <Field type="text" name="lastName" className="txtInput" />
              <div className="errorMessage">
                <ErrorMessage name="lastName" component="span" />
              </div>
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="email" className="labelInput">
              Correo Electrónico
            </label>
            <Field type="email" name="email" className="txtInput" />
            <div className="errorMessage">
              <ErrorMessage name="email" component="span" />
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="password" className="labelInput">
              Contraseña
            </label>
            <Field type="password" name="password" className="txtInput" />
            <div className="errorMessage">
              <ErrorMessage name="password" component="span" />
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="confirmPassword" className="labelInput">
              Confirmar Contraseña
            </label>
            <Field
              type="password"
              name="confirmPassword"
              className="txtInput"
            />
            <div className="errorMessage">
              <ErrorMessage name="confirmPassword" component="span" />
            </div>
          </div>

          <Link to="/login" className="linkForm">
            Ya soy parte de Mowton
          </Link>
          <button type="submit" disabled={isSubmitting} className="btnSubmit">
            Registrarse
          </button>
        </Form>
      )}
    </Formik>
  );
};
