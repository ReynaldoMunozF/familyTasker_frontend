import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import "./Artist_Profile.css";
import {
  getArtistById,
  getAppointmentByArtistId,
  updateArtistById,
  artistRegister,
  getAllUsers,
  deleteUserById,
  getAllComplete,
  deleteAppointmentById,
  updateScheduleById,
} from "../../services/apiCalls";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import Button from "react-bootstrap/Button";
import moment from "moment";

import icono_equipo from "../../assets/img/icono_equipo.png";
import icono_contacto from "../../assets/img/icono_contacto.png";
import icono_mis_citas from "../../assets/img/icono_miscitas.png";
import icono_citas2 from "../../assets/img/icono_Cita2.png";
import icono_nuevoArtista from "../../assets/img/icono_nuevoArtista.png";
import icono_usuarios from "../../assets/img/icono_usuarios.png";
import icono_borrar from "../../assets/img/icono_borrar.png";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import artist_1 from "../../assets/img/artista_1.jpg";
import edit_button from "../../assets/img/edit_button.png";

export const Artist_profile = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({});
  const [profileDataUpdate, setProfileDataUpdate] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
  });
  const [newArtistData, setNewArtistData] = useState({
    nickname: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    description: "",
  });
  const [appointmentsData, setAppointmentData] = useState([]);
  const [appointmentsAllData, setAppointmentsAllData] = useState([]);
  const userRdxData = useSelector(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [isAppointment, setisAppointment] = useState(false);
  const [isAllAppointment, setIsAllAppointment] = useState(false);
  const [isNotification, setIsNotification] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isNewArtist, setIsNewArtist] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUsers, setIsUsers] = useState(false);
  const [pageUser, setPageUser] = useState(1);
  const [skipUser, setskipUser] = useState(10);
  const [countUser, setcountUser] = useState();

  // const usersOrden = users.sort(function (a, b) {
  //   if (a.last_name > b.last_name) {
  //     return 1;
  //   }
  //   if (a.last_name < b.last_name) {
  //     return -1;
  //   }
  //   // a must be equal to b
  //   return 0;
  // });

  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData?.tattoo_artist_id;
  const role = userRdxData.credentials.userData?.role;

  const appointmentPending = appointmentsData.length;

 

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      setTimeout(() => {
        getArtistById(token, myId).then((res) => {
          setProfileData(res);
        });
        getAppointmentByArtistId(token, myId).then((res) => {
          setAppointmentData(res);
        });
      }, 100);
    }
    if (role === "super_admin") {
      setIsSuperAdmin(true);
    }
  }, []);

 

  const inputHandler = (event) => {
    setProfileDataUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const inputHandlerNewArtits = (event) => {
    setNewArtistData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    setIsEditing(!isEditing);
  };

  const updateArtist = () => {
    if (profileDataUpdate.first_name == "") {
      profileDataUpdate.first_name = profileData.first_name;
    }
    if (profileDataUpdate.last_name == "") {
      profileDataUpdate.last_name = profileData.last_name;
    }
    if (profileDataUpdate.password == "") {
      profileDataUpdate.password = profileData.password;
    }
    if (profileDataUpdate.email == "") {
      profileDataUpdate.email = profileData.email;
    }

    updateArtistById(token, myId, profileDataUpdate);
    setIsEditing(false);
  };

  const createArtist = () => {
    artistRegister(token, newArtistData);
    setIsNewArtist(false);
  };

  const allUsers = () => {
    getAllUsers(pageUser, skipUser).then((res) => {
      setUsers(res.results);
    });
  };

  const nextUser = () => {
    if (pageUser >= 0) {
    }
    const page = pageUser + 1;
    getAllUsers(page, skipUser).then((res) => {
      setUsers(res.results);
      setPageUser(res.page);
      setskipUser(res.skip);
      setcountUser(res.count);
    });
  };
  const lastUser = () => {
    if (pageUser >= 0) {
    }
    const page = pageUser - 1;
    getAllUsers(page, skipUser).then((res) => {
      setUsers(res.results);
      setPageUser(res.page);
      setskipUser(res.skip);
      setcountUser(res.count);
    });
  };
  const isAppointmnetStatus = () => {
    isAppointment ? setisAppointment(false) : setisAppointment(true);
  };
  const isAllAppointmnetStatus = () => {
    isAllAppointment ? setIsAllAppointment(false) : setIsAllAppointment(true);
  };

  const setIsUsersStatus = () => {
    isUsers ? setIsUsers(false) : setIsUsers(true);
  };
  const IsNewArtistStatus = () => {
    isNewArtist ? setIsNewArtist(false) : setIsNewArtist(true);
  };

  const deleteUser = (id) => {
    deleteUserById(id, token);
    setIsUsers(false);
  };

  const deleteApointment = (id, schedulesId) => {
    deleteAppointmentById(token, id);

    const updateActive = {
      active: 1,
    };

    updateScheduleById(schedulesId, updateActive);
    setIsAllAppointment(false);
  };

  const getAppointment = () => {
    getAllComplete(token).then((res) => {
      setAppointmentsAllData(res.results);
    });
  };
  

  return (
    <div className="profile_container">
      <div className="alert_container"></div>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item className="head_container_list" variant="secondary">
            {!isEditing ? (
              <img
                className="img_edit"
                src={edit_button}
                alt="edit"
                onClick={() => buttonHandler()}
              />
            ) : null}{" "}
            MI PERFIL{" "}
            <Image className="img_profile" src={artist_1} roundedCircle />
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Nickname: </strong>
            <CustomInput
              placeholder={profileData.nickname}
              statusDisabled={true}
              statusFocus={true}
              name="nickname"
              type="text"
              handler={inputHandler}
            ></CustomInput>
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Nombre: </strong>
            <CustomInput
              placeholder={profileData.first_name}
              statusDisabled={!isEditing}
              statusFocus={!isEditing}
              name="first_name"
              type="text"
              handler={inputHandler}
            ></CustomInput>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Apellido: </strong>
            <CustomInput
              placeholder={profileData.last_name}
              statusDisabled={!isEditing}
              statusFocus={!isEditing}
              name="last_name"
              type="text"
              handler={inputHandler}
            ></CustomInput>
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Email: </strong>
            <CustomInput
              placeholder={profileData.email}
              statusDisabled={!isEditing}
              statusFocus={!isEditing}
              name="email"
              type="text"
              handler={inputHandler}
            ></CustomInput>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Fecha de Alta: </strong>
            <CustomInput
              placeholder={moment(profileData.created_at).format("DD-MM-YYYY")}
              statusDisabled={true}
              statusFocus={true}
              name="last_name"
              type="text"
            ></CustomInput>
          </ListGroup.Item>
          {isEditing ? (
            <ListGroup.Item className="d-flex justify-content-end align-items-start">
              <Button variant="outline-success" onClick={() => updateArtist()}>
                Guardar
              </Button>
              <Button variant="outline-danger" onClick={() => buttonHandler()}>
                Anular
              </Button>
            </ListGroup.Item>
          ) : null}
        </ListGroup>
      </Card>
      <br />
      <div className="icons_container">
        <div className="icon">
          <img
            src={icono_mis_citas}
            alt=""
            onClick={() => (isAppointmnetStatus(), setIsNotification(false))}
          />
          {isNotification ? (
            <button className="btnNotification">{appointmentPending}</button>
          ) : null}
        </div>

        <div className="icon">
          <img src={icono_equipo} alt="" />
        </div>
        <div className="icon">
          <img src={icono_contacto} alt="" />
        </div>
      </div>
      <br />
      {isSuperAdmin ? (
        <div className="icons_container">
          <div className="icon">
            <img
              src={icono_nuevoArtista}
              alt=""
              onClick={() => IsNewArtistStatus()}
            />
          </div>
          <div className="icon">
            <img
              src={icono_usuarios}
              alt=""
              onClick={() => (allUsers(), setIsUsersStatus())}
            />
          </div>
          <div className="icon">
            <img
              src={icono_citas2}
              onClick={() => (getAppointment(), isAllAppointmnetStatus())}
              alt=""
            />
          </div>
        </div>
      ) : null}
      <br />
      <div className="table_container_artist">
        {isAppointment ? (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData.map((id, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{appointmentsData[index].user.first_name}</td>
                  <td>{appointmentsData[index].user.last_name}</td>
                  <td>
                    {moment(appointmentsData[index].appointment_date).format(
                      "DD/MM/YYYY"
                    )}
                  </td>
                  <td>{appointmentsData[index].hour}</td>
                  <td>{appointmentsData[index].user.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </div>
      {isNewArtist ? (
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item className="head_container_list" variant="secondary">
              {" "}
              Crear Nuevo Artista{" "}
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Nickname: </strong>
              <CustomInput
                name="nickname"
                type="text"
                handler={inputHandlerNewArtits}
              ></CustomInput>
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Nombre: </strong>
              <CustomInput
                name="first_name"
                type="text"
                handler={inputHandlerNewArtits}
              ></CustomInput>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Apellido: </strong>
              <CustomInput
                name="last_name"
                type="text"
                handler={inputHandlerNewArtits}
              ></CustomInput>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email: </strong>
              <CustomInput
                name="email"
                type="email"
                handler={inputHandlerNewArtits}
              ></CustomInput>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Password: </strong>
              <CustomInput
                name="password"
                type="password"
                handler={inputHandlerNewArtits}
              ></CustomInput>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Descripción: </strong>
              <CustomInput
                name="description"
                type="textarea"
                handler={inputHandlerNewArtits}
              ></CustomInput>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex justify-content-end align-items-start">
              <Button variant="outline-success" onClick={() => createArtist()}>
                Guardar
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => setIsNewArtist(false)}
              >
                Anular
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ) : null}
      <div className="users_container">
        {isUsers ? (
          <>
            <Table responsive="sm" striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Fech.Nac.</th>
                  <th>Borrar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((id, index) => (
                  <tr key={index}>
                    <td>{users[index].id}</td>
                    <td>{users[index].first_name}</td>
                    <td>{users[index].last_name}</td>
                    <td>{users[index].email}</td>
                    <td>{users[index].phone}</td>
                    <td>
                      {moment(users[index].birthday).format("DD/MM/YYYY")}
                    </td>
                    <td>
                      <img
                        className="icono_borrar"
                        src={icono_borrar}
                        alt=""
                        onClick={() => deleteUser(users[index].id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="pagination_container">
              <Pagination>
                <Pagination.Prev onClick={() => lastUser()} />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Next onClick={() => nextUser()} />
              </Pagination>
            </div>
          </>
        ) : null}
      </div>
      <div className="appointments_container">
        {isAllAppointment ? (
          <>
            <Table responsive="sm" striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Artista</th>
                  <th>Borrar</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsAllData.map((id, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{appointmentsAllData[index].user.first_name}</td>
                    <td>{appointmentsAllData[index].user.last_name}</td>
                    <td>
                      {moment(appointmentsAllData[index].date).format(
                        "DD/MM/YYYY"
                      )}
                    </td>
                    <td>{appointmentsAllData[index].hour}</td>
                    <td>{appointmentsAllData[index].tattoo_artist.nickname}</td>
                    <td>
                      <img
                        className="icono_borrar"
                        src={icono_borrar}
                        alt=""
                        onClick={() =>
                          deleteApointment(
                            appointmentsAllData[index].id,
                            appointmentsAllData[index].schedules_id
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* <div className="pagination_container">
              <Pagination>
                <Pagination.Prev onClick={() => lastUser()} />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Next onClick={() => nextUser()} />
              </Pagination>
            </div> */}
          </>
        ) : null}
      </div>
    </div>
  );
};
