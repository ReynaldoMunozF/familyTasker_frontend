import { useEffect, useState } from "react";
import img1 from "../../assets/img/family1.png";
import titulo from "../../assets/img/titulo.png";
import Button from "react-bootstrap/Button";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";
import {
  userLogin,
  userRegister,
  familyRegister,
} from "../../services/apiCalls";
import { emailValidator, objectValidator } from "../../validator";
import "./Home.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export const Home = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [familyData, setFamilyData] = useState({
    family_name: "",
  });
  const [familyNewRegister, setFamilyNewRegister] = useState({});
  const [userDataRegister, setUserDataRegister] = useState({
    roles_id: 1,
    families_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isAlertMail, setIsAlertMail] = useState(false);
  const [isFamily, setIsFamily] = useState(false);

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const inputHandlerRegister = (event) => {
    setUserDataRegister((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const inputHandlerFamily = (event) => {
    setFamilyData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRdxData = useSelector(userData);

  const buttonHandler = () => {
    if (credentials.email == "" || credentials.password == "") {
    }

    userLogin(credentials)
      .then((token) => {
        if (!token) {
          navigate("/register");
          return null;
        }
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };
        dispatch(login({ credentials: data }));
        setTimeout(() => {
          navigate("/profile");
        });
      })
      .catch((err) => console.error("Ha ocurrido un error", err));
  };

  const newFamilyRegister = () => {
    familyRegister(familyData)
      .then((familyResponse) => {
        userDataRegister.families_id = familyResponse.data.newFamily.id;
        setIsFamily(false);
        setIsRegister(true);
      })
      .catch((err) => console.error("Ha ocurrido un error", err));
  };

  const buttonHandlerRegister = () => {
    if (!objectValidator(userDataRegister)) {
      return setIsAlert(true);
    }
    if (!emailValidator(userDataRegister.email)) {
      return setIsAlertMail(true);
    }

    userRegister(userDataRegister)
      .then(() => {
        credentials.email = userDataRegister.email;
        credentials.password = userDataRegister.password;

        userLogin(credentials).then((token) => {
          if (!token) {
            navigate("/register");
            return null;
          }
          const decodedToken = jwtDecode(token);

          const data = {
            token: token,
            userData: decodedToken,
          };
          dispatch(login({ credentials: data }));
          setTimeout(() => {
            navigate("/profile");
          });
        });
      })
      .catch((err) => console.error("Ha ocurrido un error", err));
  };

  return (
    <div className="portada_principal">
      <div className="first_container">
        <div className="img_principal">
          <img src={img1} alt="" />
        </div>
        <div className="register_conatiner">
          <div className="btn_container">
            <Button
              variant="warning"
              onClick={() => (
                setIsLogin(true), setIsFamily(false), setIsRegister(false)
              )}
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="light"
              onClick={() => (setIsLogin(false), setIsFamily(true))}
            >
              Regístrarse
            </Button>
          </div>

          {isLogin ? (
            <div className="login_container">
              <CustomInput
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
              <Button variant="dark" onClick={buttonHandler}>
                Enviar
              </Button>
            </div>
          ) : null}
          {isFamily ? (
            <div className="family_container">
              <CustomInput
                placeholder={"Nombre de la familia"}
                type={"text"}
                name={"family_name"}
                handler={inputHandlerFamily}
              ></CustomInput>
              <Button variant="dark" onClick={newFamilyRegister}>
                Crear Familia
              </Button>
            </div>
          ) : null}

          {isRegister ? (
            <div className="register">
              <CustomInput
                placeholder={"Nombre"}
                type={"text"}
                name={"first_name"}
                handler={inputHandlerRegister}
              ></CustomInput>
              <CustomInput
                placeholder={"Apellido"}
                type={"text"}
                name={"last_name"}
                handler={inputHandlerRegister}
              ></CustomInput>
              <CustomInput
                placeholder={"Correo Electrónico"}
                type={"email"}
                name={"email"}
                handler={inputHandlerRegister}
              ></CustomInput>
              <CustomInput
                placeholder={"contraseña"}
                type={"password"}
                name={"password"}
                handler={inputHandlerRegister}
              ></CustomInput>
              {isAlert ? (
                <p>
                  Todos los campos son obligatorios{" "}
                  <button
                    className="btn_alert"
                    onClick={() => setIsAlert(false)}
                  >
                    x
                  </button>
                </p>
              ) : null}
              {isAlertMail ? (
                <p>
                  Ingresa un correo electrónico valido{" "}
                  <button
                    className="btn_alert"
                    onClick={() => setIsAlertMail(false)}
                  >
                    x
                  </button>
                </p>
              ) : null}
              <Button variant="dark" onClick={() => buttonHandlerRegister()}>
                Enviar
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="commit_text">
        <img src={titulo} alt="" />
        <p>
          "FamilyTasker es una aplicación de gestión de tareas diseñada para
          ayudar a las familias a organizar y coordinar sus responsabilidades
          diarias de manera efectiva. Ya sea que se trate de tareas domésticas,
          actividades escolares o eventos familiares, FamilyTask simplifica la
          planificación y la ejecución de tareas al proporcionar una plataforma
          centralizada para la colaboración y la comunicación dentro de la
          familia."
        </p>
      </div>
    </div>
  );
};
