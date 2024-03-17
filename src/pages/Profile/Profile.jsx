import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import {
  getUserById,
  getFamilyById,
  updateUserById,
  updateTaskById,
  createTask,
  getTasksByFamilyIdAndDate,
  deleteTaskById,
  getTasksByFamilyAndType,
} from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import es from "date-fns/locale/es";
import "moment/locale/pt-br";
import { userData } from "../userSlice";
import { registerLocale } from "react-datepicker";
import Button from "react-bootstrap/Button";
import moment from "moment";
import "moment/locale/pt-br";
import { Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import edit_button from "../../assets/img/edit_button.png";
import icon_user from "../../assets/img/user_icon.png";
import icon_newUser from "../../assets/img/newUser_icon.png";
import icon_add from "../../assets/img/add_icon.png";
import icon_list2 from "../../assets/img/list2_icon.png";
import icon_check from "../../assets/img/check_icon.png";
import icon_delete from "../../assets/img/delete_icon.png";
import icon_shop from "../../assets/img/shop_icon.png";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { MagicMotion } from "react-magic-motion";
import { foodProducts } from "../../constans";

export const Profile = () => {
  registerLocale("es", es);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [profileDataUpdate, setProfileDataUpdate] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthday: "",
  });
  const [taskData, setTaskData] = useState({
    name_task: "",
  });
  const [isAllTasks, setIsAllTasks] = useState(false);
  const [allFamilyTaskData, setAllFamilyTasksData] = useState([]);
  const [taskFamilyDate, setAllTaskFamilyDateFamily] = useState([]);
  const [taskFamilyType, setAllTaskFamilyType] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isShop, setIsShop] = useState(false);
  const [isNotification, setIsNotification] = useState(true);
  const [isAlertTask, setIsAlertTask] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [allTaskFamilyDate, setAllTaskFamilyDate] = useState([]);
  const userRdxData = useSelector(userData);
  const [startDate, setStartDate] = useState(new Date());
  const [startHour, setStartHour] = useState("");

  const [taskDate, setTaskDate] = useState(new Date());

  const [isTodo, setIsTodo] = useState(false);
  const [show, setShow] = useState(false);
  const [shopData, setShopData] = useState({
    name_task: "",
  });

  const [urlShop, setUrlShop] = useState("");

  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData?.user_id;
  const myFamilyId = userRdxData.credentials.userData?.families_id;
  const myName = userRdxData.credentials.userData?.first_name;

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

  const alltaskFamily = allFamilyTaskData?.tasks;

  function sortByHour(arr) {
    return arr.sort((a, b) => {
      const hourA = parseInt(a.task_date.split(":")[0]);
      const hourB = parseInt(b.task_date.split(":")[0]);
      return hourA - hourB;
    });
  }

  const inputHandler = (event) => {
    setProfileDataUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const taskHandler = (event) => {
    setTaskData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const shopHandler = (event) => {
    let imgShopUrl = "";
    for (let index = 0; index < foodProducts.length; index++) {
      if (foodProducts[index].name === event.target.value) {
        imgShopUrl = foodProducts[index].url;
        setUrlShop(imgShopUrl);
      }
    }
    setShopData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {}, [profileDataUpdate]);

  const buttonHandler = () => {
    setIsEditing(!isEditing);
  };

  const isTodoStatus = () => {
    isTodo ? setIsTodo(false) : setIsTodo(true);
  };

  const isProfileStatus = () => {
    isProfile ? setIsProfile(false) : setIsProfile(true);
  };

  const isTasksStatus = () => {
    isAllTasks ? setIsAllTasks(false) : setIsAllTasks(true);
  };
  const isShopStatus = () => {
    isShop ? setIsShop(false) : setIsShop(true);
  };

  const updateUser = () => {
    if (profileDataUpdate.first_name == "") {
      profileDataUpdate.first_name = profileData.first_name;
    }
    if (profileDataUpdate.last_name == "") {
      profileDataUpdate.last_name = profileData.last_name;
    }
    if (profileDataUpdate.birthday == "") {
      profileDataUpdate.birthday = profileData.birthday;
    }
    if (profileDataUpdate.email == "") {
      profileDataUpdate.email = profileData.email;
    }

    updateUserById(token, myId, profileDataUpdate);
    setIsEditing(false);
  };

  useEffect(() => {
    const typeTask = "task";
    getTasksByFamilyIdAndDate(
      myFamilyId,
      moment(taskDate).format("YYYY-MM-DD"),
      typeTask
    ).then((res) => {
      setAllTaskFamilyDateFamily(res);
    });
  }, [taskDate]);

  useEffect(() => {
    const typeTask = "shopping";
    getTasksByFamilyAndType(myFamilyId, typeTask).then((res) => {
      setAllTaskFamilyType(res);
    });
  }, [taskDate]);

  let countTaskActives = 0;
  for (let index = 0; index < taskFamilyDate.length; index++) {
    if (taskFamilyDate[index].status === "active") {
      countTaskActives += 1;
    }
  }

  const tasksData = {
    users_id: myId,
    families_id: myFamilyId,
    name_task: taskData.name_task,
    date: moment(startDate).format("YYYY-MM-DD"),
    hour: startHour,
    status: "active",
    type: "task",
  };
  const shopsData = {
    users_id: myId,
    families_id: myFamilyId,
    name_task: shopData.name_task,
    date: moment(new Date()).format("YYYY-MM-DD"),
    status: "active",
    url: urlShop,
    type: "shopping",
  };

  const newShop = () => {
    if (shopsData.name_task === "") {
      return setIsAlertTask(true);
    } else {
      createTask(shopsData).then((restask) => {
        restask.users_id = Number(restask.users_id);
        setAllTaskFamilyType([...taskFamilyType, restask]);
      });
    }
  };
  const newTask = () => {
    if (taskData.name_task === "") {
      return setIsAlertTask(true);
    } else {
      createTask(tasksData).then((restask) => {
        restask.users_id = Number(restask.users_id);
        (restask.task_date = moment(restask.task_date).format("HH:mm")),
          setAllTaskFamilyDateFamily([...taskFamilyDate, restask]);
      });
    }
  };

  const updateStatusTask = (idTask, statusTask) => {
    let taskStatusData = "";
    if (statusTask == "inactive") {
      taskStatusData = {
        status: "active",
      };
    } else if (statusTask == "active") {
      taskStatusData = {
        status: "inactive",
      };
    }
    updateTaskById(idTask, taskStatusData)
      .then(() => {
        // Actualizar el estado de la tarea en la lista actual
        const updatedTasks = taskFamilyDate.map((task) => {
          if (task.id === idTask) {
            return { ...task, status: taskStatusData.status };
          }

          return task;
        });

        setAllTaskFamilyDateFamily(updatedTasks);
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
        // Manejar el error si es necesario
      });
  };

  const deleteTask = (taskId) => {
    deleteTaskById(taskId)
      .then(() => {
        // Eliminar la tarea de la lista actual
        const updatedTasks = taskFamilyDate.filter(
          (task) => task.id !== taskId
        );
        setAllTaskFamilyDateFamily(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        // Manejar el error si es necesario
      });
  };
  const deleteShop = (taskId) => {
    deleteTaskById(taskId)
      .then(() => {
        // Eliminar la tarea de la lista actual
        const updatedTasks = taskFamilyType.filter(
          (task) => task.id !== taskId
        );
        setAllTaskFamilyType(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        // Manejar el error si es necesario
      });
  };

  return (
    <div className="profileDesign">
      <br />
      <MagicMotion>
        <div className="family_name">
          <strong>{allFamilyTaskData.family_name?.toUpperCase()}</strong>
        </div>
        <br />
        <div className="family_name">
          <p>
            {" "}
            Hola <strong>{myName?.toUpperCase()}</strong> <br />
            ¡Bienvenid@ a nuestra lista de tareas familiares! <br /> ¡Aquí es
            donde la magia familiar sucede! <br />
            Listos para organizarnos juntos y hacer que cada día sea especial.{" "}
            <br />
            ¡A trabajar en equipo y crear recuerdos inolvidables! <br />
            Escriban sus tareas, ¡vamos a hacerlas realidad juntos!"
          </p>
        </div>
        <br />
      </MagicMotion>
      <div className="profileData_container">
        <div className="icons_container">
          <div className="iconProfile">
            <img src={icon_user} alt="" onClick={() => isProfileStatus()} />
          </div>

          <div className="iconProfile">
            <img
              src={icon_list2}
              alt=""
              onClick={() => (
                isTodoStatus(), isTasksStatus(), setIsNotification(false)
              )}
            />

            {isNotification ? (
              <button className="btnNotification2">{countTaskActives}</button>
            ) : null}
          </div>
          <div className="iconProfile">
            <img src={icon_shop} alt="" onClick={() => isShopStatus()} />
          </div>
          <div className="iconProfile">
            <img
              src={icon_newUser}
              onClick={() => navigate("/appointments")}
              alt=""
            />
          </div>
          {/* <div className="icon">
            <img src={icono_contacto} alt="" />
          </div> */}
        </div>

        {isProfile ? (
          <Card style={{ width: "26rem" }}>
            <ListGroup variant="flush">
              <ListGroup.Item className="profile_title">
                <strong>PERFIL</strong>{" "}
                {!isEditing ? (
                  <img
                    src={edit_button}
                    alt="edit"
                    onClick={() => buttonHandler()}
                  />
                ) : null}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Nonbre: </strong>{" "}
                <CustomInput
                  placeholder={profileData.first_name}
                  value={profileData.first_name}
                  statusDisabled={!isEditing}
                  statusFocus={!isEditing}
                  name="first_name"
                  type="text"
                  handler={inputHandler}
                ></CustomInput>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Apellidos:</strong>
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
                <strong>Fecha Nacimiento:</strong>
                <CustomInput
                  placeholder={
                    !profileData.birthday == ""
                      ? moment(profileData.birthday).format("DD-MM-YYYY")
                      : ""
                  }
                  statusDisabled={!isEditing}
                  statusFocus={!isEditing}
                  name="birthday"
                  type={isEditing ? "date" : "text"}
                  handler={inputHandler}
                ></CustomInput>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <strong>Email: </strong>{" "}
                <CustomInput
                  placeholder={profileData.email}
                  statusDisabled={!isEditing}
                  statusFocus={!isEditing}
                  name="email"
                  type="email"
                  handler={inputHandler}
                ></CustomInput>
              </ListGroup.Item>
              {isEditing ? (
                <ListGroup.Item className="d-flex justify-content-end align-items-start">
                  <Button
                    variant="outline-success"
                    onClick={() => updateUser()}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => buttonHandler()}
                  >
                    Anular
                  </Button>
                </ListGroup.Item>
              ) : null}
            </ListGroup>
          </Card>
        ) : null}

        <div className="to_do_container">
          {isTodo ? (
            <div className="todo_component">
              <div className="date_container">
                <DatePicker
                  locale="es"
                  let
                  selected={taskDate}
                  dateFormat={"dd/MM/YYYY"}
                  minDate={new Date()}
                  showIcon
                  onChange={(date) => (setStartDate(date), setTaskDate(date))}
                  //plugins={[<TimePicker hideSeconds />]}
                />
              </div>
              <div className="task_container">
                <input
                  className="prueba"
                  type="time"
                  name="hour"
                  onChange={(event) => setStartHour(event.target.value)}
                />

                <CustomInput
                  placeholder={"Aqui las Tareas familiares..."}
                  name="name_task"
                  type="text"
                  handler={taskHandler}
                ></CustomInput>
                <img src={icon_add} onClick={() => newTask()} alt="" />
              </div>
              {isAlertTask ? (
                <div className="alert_task">
                  <i
                    className="em em-bird"
                    aria-role="presentation"
                    aria-label="BIRD"
                  ></i>
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;Debe ingresar el nombre de la tarea
                  </p>

                  <img
                    src={icon_delete}
                    onClick={() => setIsAlertTask(false)}
                    alt=""
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="table_container">
          {isAllTasks ? (
            <div className="allTasks">
              <MagicMotion>
                <div className="date_container"></div>
                {taskFamilyDate.map((id, index) => (
                  <div
                    key={index}
                    className={
                      taskFamilyDate[index].users_id === 1
                        ? taskFamilyDate[index].status === "active"
                          ? "allTasks_container1_active"
                          : "allTasks_container1_inactive"
                        : taskFamilyDate[index].users_id === 2
                        ? taskFamilyDate[index].status === "active"
                          ? "allTasks_container2_active"
                          : "allTasks_container1_inactive"
                        : taskFamilyDate[index].status === "active"
                        ? "active"
                        : "inactive"
                    }
                  >
                    <i
                      className="em em-memo"
                      aria-role="presentation"
                      aria-label="MEMO"
                    ></i>
                    <div className="hour">
                      <p>{taskFamilyDate[index].hour}</p>
                    </div>

                    <div className="task">
                      <p>
                        {" "}
                        &nbsp;&nbsp;
                        {taskFamilyDate[index]?.name_task}
                      </p>
                    </div>
                    <div className="check_Task">
                      <img
                        src={icon_check}
                        onClick={() =>
                          updateStatusTask(
                            taskFamilyDate[index].id,
                            taskFamilyDate[index].status
                          )
                        }
                        alt=""
                      />
                      <img
                        src={icon_delete}
                        onClick={() => deleteTask(taskFamilyDate[index].id)}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </MagicMotion>
            </div>
          ) : null}
        </div>
        <div className="shop_container_principal">
          <div className="shop_component">
            {isShop ? (
              <div className="select_component">
                <div className="shop_component">
                  <label>Comprar:</label>
                  <select
                    id="productos"
                    name="name_task"
                    value={shopData}
                    onChange={shopHandler}
                  >
                    <option value="">Selecciona un producto</option>
                    {foodProducts.map((producto) => (
                      <option key={producto.id} value={producto.name}>
                        {producto.name}
                      </option>
                    ))}
                  </select>
                  <p>
                    <strong>{shopData.name_task}</strong>
                  </p>
                  <Button
                    onClick={() => (newShop(), setIsAlertTask(false))}
                    variant="warning"
                  >
                    Agregar a la lista
                  </Button>{" "}
                </div>
                {isAlertTask ? (
                  <div className="alert_task">
                    * Debe ingresar el nombre de la tarea
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <br />
          {isShop ? (
            <div className="allShop_container">
              <div className="allShop">
                <MagicMotion>
                  <div className="shop_container"></div>
                  {taskFamilyType.map((id, index) => (
                    <div key={index} className="shop_container2">
                      <div className="shopname">
                        <p>{taskFamilyType[index]?.name_task}</p>
                      </div>
                      <div className="shopimg">
                        <img src={taskFamilyType[index].url} alt="" />
                      </div>
                      <div className="check_shop">
                        <img
                          src={icon_delete}
                          onClick={() => deleteShop(taskFamilyType[index].id)}
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
                </MagicMotion>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* <---------------------------------------------------------------- */}

      {show ? (
        <Alert
          className="mb-2"
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="red-border"
          />
          Todos los campos son Obligatorios.
        </Alert>
      ) : (
        <div />
      )}
    </div>
  );
};
