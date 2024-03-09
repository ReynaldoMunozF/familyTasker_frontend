import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalAppointment = ({
  createAppointmentById,
  Title,
  date,
  hour,
  closeModal,
}) => {
  const [show, setShow] = useState(true);
  const [on, setOn] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const btn_acepted = () => {
    on ? setOn(false) : setOn(true);
  }




  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <p>
              {" "}
              <strong>Día : {date}</strong>
            </p>
            <p>
              <strong>Hora : {hour}</strong>
            </p>
          
          
            <li>
              Recuerda que para anular esta cita, el plazo m&aacute;ximo es 48
              horas antes de la misma
            </li>
            <p>
              <br />
              El d&iacute;a de la cita toma en cuenta estas recomendaciones:
              
                <li>Toma suficiente agua para mantenerte hidratado.</li>
                <li>No ingerir alcohol previamente.</li>
                <li>Ven con ropa c&oacute;moda.</li>
                <li>Se puntual.</li>
              
            </p>
          
          <label htmlFor="cbox1">
            <input type="checkbox" id="cbox1" value="first_checkbox" onClick={() =>btn_acepted()} /> Acepto las condiciones 
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="success" disabled = {on} onClick={createAppointmentById}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
