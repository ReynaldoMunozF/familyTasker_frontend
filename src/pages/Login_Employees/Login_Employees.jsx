import { useEffect, useState } from "react";
import "./Login_Employees.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { artistLogin} from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";
import { Alert } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

export const Login_artist = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    if (credentials.email == "" || credentials.password == "") {
      return setShow(true);
    }
    artistLogin(credentials)
      .then((token) => {
        if (!token) {
          navigate("/artistLogin");
          return null;
        }
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };
        dispatch(login({ credentials: data }));
        setTimeout(() => {
          navigate("/artistProfile");
        });
      })
      .catch((err) => console.error("Ha ocurrido un error", err),
      setShow(false), setShow2(true));
  };

  return (
    
     
      <div className="login">
        <div className="login_div">
        <CustomInput
          autoFocus 
          placeholder={"Ingresa tu email"}
          type={"email"}
          name={"email"}
          handler={inputHandler}
        ></CustomInput>
        <CustomInput
       
          placeholder={"Ingresa tu contraseña"}
          type={"password"}
          name={"password"}
          handler={inputHandler}
        ></CustomInput>
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Todos los campos son Obligatorios.
          </Alert>
        ) : (
          <div />
        )}
        {show2 ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Email o contraseña incorrecto.
          </Alert>
        ) : (
          <div />
        )}
        <h1>{credentials.name}</h1>
        <Button variant="warning" onClick={buttonHandler}>Inicio Sesión</Button>
        <br />
        <p>Acceso solo personal autorizado</p>
        </div>
      </div>
    
  );
};
