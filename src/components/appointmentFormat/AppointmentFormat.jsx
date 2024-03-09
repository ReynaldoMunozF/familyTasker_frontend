import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../appointmentFormat/appointmentFormat.css";



export const AppointmentCard= ({artist , date, handlerButton, hour}) =>  {
  
  return (
    <div className="appoint_container">
    <Card className="text-center">
      <Card.Header >{artist}
      <Card.Img variant="left" src="https://www.clarin.com/img/2022/07/22/y_TLtfcFR_360x240__1.jpg" />
      </Card.Header>
      <Card.Body>
        <Card.Title>Día: {date}</Card.Title>
        <Card.Title>Hora: {hour}</Card.Title>
       
        <Button className ='modificar' variant="warning" size="sm"  onClick={handlerButton}>Modificar</Button>
        <Button className ='anular' variant="danger" size="sm"  onClick={handlerButton}>Anular</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
    </div>
  );
}

