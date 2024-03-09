import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import "./Appointments.css";
import {
  getUserById,
  getAllArtist,
  getScheduleByIdArtist,
  createAppointmentById,
  updateScheduleById,
} from "../../services/apiCalls";
import { ArtistCard } from "../../components/ArtistCard/ArtistCard";

import { BtnAppointments } from "../../components/ButtonAppointment/ButtonAppointment";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import moment from "moment";
import "moment/locale/pt-br";
import { useNavigate } from "react-router-dom";
import { ModalAppointment } from "../../components/Modal/Modal";
import artist_1 from "../../assets/img/artista_1.jpg";
import artist_2 from "../../assets/img/artista_2.jpg";
import artist_3 from "../../assets/img/artista_3.jpg";
import artist_4 from "../../assets/img/artista_4.jpg";
import artist_5 from "../../assets/img/artista_5.jpg";
import artist_6 from "../../assets/img/artista_6.jpg";

export const Appointments = () => {
  registerLocale("es", es);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [artistData, setArtistData] = useState([]);
  const [artistSelectId, setArtistSelectId] = useState(0);
  const [artistSelectNickname, setArtistSelectNickname] = useState("");
  const [artistSchedules, setArtistSchedule] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [appointmentData, setappointmentData] = useState({
    user_id: 0,
    tattoo_artist_id: 0,
    appointment_date: "",
    hour: "",
    schedules_id: 0,
  });
  const [scheduleId, setScheduleId] = useState(0);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState();

  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData?.user_id;

  const artist_photo = [
    artist_1,
    artist_2,
    artist_3,
    artist_4,
    artist_5,
    artist_6,
  ];

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      setTimeout(() => {
        getUserById(token, myId).then((res) => {
          setProfileData(res);
        });
        getAllArtist().then((res) => {
          setArtistData(res);
        });
      }, 100);
    }
  }, []);

  const artistSelect = (artistSelectId, artistSelectNickname, artistPhoto) => {
    setArtistSelectId(artistSelectId);
    setArtistSelectNickname(artistSelectNickname);
    setPhoto(artistPhoto);
    getScheduleByIdArtist(artistSelectId).then((res) => {
      setArtistSchedule(res);
    });
    setShow(false);
    setShow2(true);
  };

  const selectSchedulesDate = () => {
    const dateSchedule2 = [];

    for (let index = 0; index < artistSchedules.length; index++) {
      const dateShedule = moment(
        artistSchedules[index].appointment_date
      ).format("DD-MM-YYYY");

      const dateSelection = moment(startDate).format("DD-MM-YYYY");

      if (dateShedule == dateSelection) {
        const dateSchedule = {
          id: artistSchedules[index].id,
          hour: artistSchedules[index].hour,
          active: artistSchedules[index].active,
        };
        dateSchedule2.push(dateSchedule);
      }
    }
    return dateSchedule2;
  };

  const datefinal = selectSchedulesDate();

  const createDataAppointment = (hourArtist, selectScheduleId) => {
    setShowModal(true);
    setScheduleId(selectScheduleId);
    setappointmentData((prevState) => ({
      ...prevState,

      user_id: parseInt(myId),
      tattoo_artist_id: artistSelectId,
      appointment_date: moment(startDate).format("YYYY-MM-DD"),
      hour: hourArtist,
      schedules_id: selectScheduleId,
    }));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const createAppointment = () => {
    createAppointmentById(token, appointmentData);
    const updateActive = {
      active: 0,
    };
    updateScheduleById(scheduleId, updateActive);

    setShowModal(false);
    navigate("/profile");
  };
  return (
    <div className="container_major">
      <div className="titulo">
        {show ? (
          <>
            <h1>
              <strong>ARTISTAS</strong>
            </h1>
            <p>
              Nuestro equipo está compuesto por varios artistas especializados
              cada uno en diversos estilos, entre ellos podemos destacar el
              Realismo, Anime, Japonés y Blackwork.
            </p>
          </>
        ) : (
          <div />
        )}
      </div>
      <div className="artists_container">
        {show ? (
          artistData.map((id, index) => (
            <ArtistCard
              photo={artist_photo[index]}
              key={index}
              artist={artistData[index].nickname}
              description={artistData[index].description}
              selectArtist={() =>
                artistSelect(
                  artistData[index].id,
                  artistData[index].nickname,
                  artist_photo[index]
                )
              }
              nombre={"Seleccionar"}
              BtnColor={"outline-dark"}
            ></ArtistCard>
            //date={appointmentData[index].appointment_date}
          ))
        ) : (
          <div />
        )}
      </div>

      <div className="appointment_artist_container">
        {show2 ? (
          <>
            <h3>Selecciona la Fecha:</h3>

            <DatePicker
              locale="es"
              let
              selected={startDate}
              dateFormat={"dd/MM/YYYY"}
              minDate={new Date()}
              filterDate={(date) => date.getDay() != 0 && date.getDay() != 6}
              showIcon
              onChange={(date) => setStartDate(date)}
            ></DatePicker>

            <ArtistCard
              photo={photo}
              artist={artistSelectNickname}
              nombre={"Cambiar"}
              BtnColor={"outline-dark"}
              selectArtist={() => window.location.replace("")}
            />

            <div className="datePicke_container"></div>

            <div className="shedule_conatiner">
              {datefinal.map((id, index) => (
                <BtnAppointments
                  key={index}
                  active={datefinal[index].active}
                  hour={datefinal[index].hour}
                  disable={false}
                  createDataAppointment={() =>
                    createDataAppointment(
                      datefinal[index].hour,
                      datefinal[index].id
                    )
                  }
                ></BtnAppointments>
              ))}
            </div>
          </>
        ) : (
          <div />
        )}
      </div>
      <div className="modal_container">
        {showModal ? (
          <>
            <ModalAppointment
              Title={"CONFIRMA TU CITA"}
              date={moment(startDate).format("DD-MM-YYYY")}
              hour={appointmentData.hour}
              closeModal={() => closeModal()}
              createAppointmentById={() => createAppointment()}
            />
          </>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
