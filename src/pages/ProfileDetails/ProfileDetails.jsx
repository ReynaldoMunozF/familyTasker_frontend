import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import Accordion from "react-bootstrap/Accordion";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { emailValidator, objectValidator } from "../../validator";

import "./ProfileDetails.css";

import {
  getAllUsers,
  getUserById,
  getFamilyById,
  userRegister,
  updateUserById,
  updateUserDetailsById,
} from "../../services/apiCalls";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { CardProfile } from "../../components/CardProfileDetails/CardProfileDetails";

export const ProfileDetails = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [profileDataUser, setProfileDataUser] = useState({});
  const [userDataRegister, setUserDataRegister] = useState({
    roles_id: 1,
    families_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [allFamilyTaskData, setAllFamilyTasksData] = useState([]);
  const [allFamilys, setAllFamilys] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const userRdxData = useSelector(userData);
  const [isRegister, setIsRegister] = useState(true);
  const [isAlert, setIsAlert] = useState(false);
  const [isAlertMail, setIsAlertMail] = useState(false);
  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData?.user_id;
  const myFamilyId = userRdxData.credentials.userData?.families_id;
  const [profileDataUpdate, setProfileDataUpdate] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthday: "",
  });
  const [userDetailsUpdate, setUserDetailsUpdate] = useState({
    allergies: "",
    height: "",
    pant_size: "",
    shirt_size: "",
    shoe_size: "",
    weight: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      getUserById(token, myId).then((res) => {
        setProfileData(res);
      });
      getFamilyById(myFamilyId).then((res) => {
        setAllFamilyTasksData(res);
      });
    }
  }, []);

  console.log(profileData);
  console.log(allFamilyTaskData.user);

  const inputHandler = (event) => {
    setProfileDataUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const inputHandlerUserDetail = (event) => {
    setUserDetailsUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  console.log(userDetailsUpdate);

  const buttonHandler = () => {
    setIsEditing(!isEditing);
  };

  const inputHandlerRegister = (event) => {
    setUserDataRegister((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const buttonHandlerRegister = () => {
    userDataRegister.families_id = myFamilyId;
    userRegister(userDataRegister);
  };

  //console.log(numberFamily);
  useEffect(() => {
    const fetchData = async () => {
      const promises = [];
      for (let index = 1; index <= allFamilyTaskData.user?.length; index++) {
        promises.push(getUserById(token, index));
      }
      const familyData = await Promise.all(promises);
      setAllFamilys(familyData);
    };

    fetchData();
  }, [allFamilyTaskData]);

  const updateUser = (idUser) => {

    getUserById(token, idUser).then((res) => {
      setProfileDataUser(res);
    });
  
    if (profileDataUpdate.first_name == "") {
      profileDataUpdate.first_name = profileData.first_name;
    }
    if (profileDataUpdate.last_name == "") {
      profileDataUpdate.last_name = profileDataUser.last_name;
    }
    if (profileDataUpdate.birthday == "") {
      profileDataUpdate.birthday = profileDataUser.birthday;
    }
    if (profileDataUpdate.email == "") {
      profileDataUpdate.email = profileDataUser.email;
    }
    
    updateUserById(token, idUser, profileDataUpdate);
    setIsEditing(false);
  };

  const updateUserDetails = (idUser) => {
    if (userDetailsUpdate.weight== "") {
      userDetailsUpdate.weight = "pendiente";
    }
    if (userDetailsUpdate.height == "") {
      userDetailsUpdate.height = "pendiente";
    }
    if (userDetailsUpdate.pant_size == "") {
      userDetailsUpdate.pant_size = "pendiente";
    }
    if (userDetailsUpdate.shirt_size == "") {
      userDetailsUpdate.shirt_size = "pendiente";
    }
    if (userDetailsUpdate.shoe_size == "") {
      userDetailsUpdate.shoe_size = "pendiente";
    }
    if (userDetailsUpdate.allergies == "") {
      userDetailsUpdate.allergies = "pendiente";
    }
    updateUserDetailsById(token, idUser,userDetailsUpdate );
    setIsEditing(false);
  };

  return (
    <div className="profile_famiky_container">
      <p>
        <strong>
          ¿ Falta alguien en casa ? <br />
          agrégalo
        </strong>
      </p>
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
              <button className="btn_alert" onClick={() => setIsAlert(false)}>
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
      {allFamilys.map((id, index) => (
        <Accordion key={index} defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{allFamilys[index].first_name}</Accordion.Header>
            <Accordion.Body>
              {!isEditing ? (
                <img
                  className="imgEdit"
                  src={
                    "https://cdn-icons-png.flaticon.com/128/2444/2444472.png"
                  }
                  alt="edit"
                  onClick={() => buttonHandler()}
                />
              ) : null}
              <CardProfile
                //description={"prueba"}

                icon={"https://cdn-icons-png.flaticon.com/128/4880/4880700.png"}
                placeholder={allFamilys[index].first_name}
                value={allFamilys[index].first_name}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name={"first_name"}
                type={"text"}
                handler={inputHandler}
              />
              <CardProfile
                //description={"prueba"}
                icon={"https://cdn-icons-png.flaticon.com/128/4880/4880700.png"}
                placeholder={allFamilys[index].last_name}
                value={allFamilys[index].last_name}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name={"last_name"}
                type={"text"}
                handler={inputHandler}
              />
              <CardProfile
                //description={"prueba"}
                icon={
                  "https://cdn-user-icons.flaticon.com/141911/141911870/1710686509807.svg?token=exp=1710687458~hmac=123e704cb554307c743f786963c76a8a"
                }
                placeholder={
                  !allFamilys[index].birthday == ""
                    ? moment(allFamilys[index].birthday).format("DD-MM-YYYY")
                    : ""
                }
                value={allFamilys[index].birthday}
                name={"birthday"}
                type={isEditing ? "date" : "text"}
                handler={inputHandler}
              />
              <CardProfile
                icon={"https://cdn-icons-png.flaticon.com/128/4727/4727962.png"}
                placeholder={allFamilys[index].email}
                value={allFamilys[index].email}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name={"email"}
                type={"email"}
                handler={inputHandler}
              />
              <CardProfile
                icon={"https://cdn-icons-png.flaticon.com/128/7990/7990208.png"}
                placeholder={allFamilys[index].userDetails[0].height}
                value={allFamilys[index].userDetails[0].height}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name={"height"}
                type={"text"}
                handler={inputHandlerUserDetail}
              />
              <CardProfile
                icon={"https://cdn-icons-png.flaticon.com/128/3213/3213786.png"}
                placeholder={allFamilys[index].userDetails[0].weight}
                value={allFamilys[index].userDetails[0].weight}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name={"weight"}
                type={"text"}
                handler={inputHandlerUserDetail}
              />
              <CardProfile
                icon={"https://cdn-icons-png.flaticon.com/128/3177/3177754.png"}
                placeholder={allFamilys[index].userDetails[0].shirt_size}
                value={allFamilys[index].userDetails[0].shirt_size}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name={"shirt_size"}
                type={"text"}
                handler={inputHandlerUserDetail}
              />
              <CardProfile
                icon={
                  "https://cdn-icons-png.flaticon.com/128/13943/13943807.png"
                }
                placeholder={allFamilys[index].userDetails[0].pant_size}
                value={allFamilys[index].userDetails[0].pant_size}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name={"pant_size"}
                type={"text"}
                handler={inputHandlerUserDetail}
              />
              <CardProfile
                icon={
                  "https://cdn-icons-png.flaticon.com/128/13943/13943803.png"
                }
                placeholder={allFamilys[index].userDetails[0].shoe_size}
                value={allFamilys[index].userDetails[0].shoe_size}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name={"shoe_size"}
                type={"text"}
                handler={inputHandlerUserDetail}
              />
              <CardProfile
                icon={"https://cdn-icons-png.flaticon.com/128/7194/7194015.png"}
                placeholder={allFamilys[index].userDetails[0].allergies}
                value={allFamilys[index].userDetails[0].allergies}
                statusDisabled={!isEditing}
                statusFocus={!isEditing}
                name={"allergies"}
                type={"text"}
                handler={inputHandlerUserDetail}
              />

              {isEditing ? (
                <div className="buttons_edit">
                  <Button
                    variant="outline-success"
                    onClick={() => updateUser((allFamilys[index].id),updateUserDetails(allFamilys[index].id))}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => buttonHandler()}
                  >
                    Anular
                  </Button>
                </div>
              ) : null}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
};
