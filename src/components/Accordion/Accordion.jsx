import Accordion from 'react-bootstrap/Accordion';
import "./Accordion.css"

export const A = ({name, email, role, id, handler}) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header className='bg-dark'>{name}</Accordion.Header>
        <Accordion.Body>
            {email}
        </Accordion.Body>
        <Accordion.Body className='bg-light'>
            {role}  <div className="apiCallButton" id={id} key={id} onClick={(e) => {handler(e)}}></div>
        </Accordion.Body>
      </Accordion.Item>

    </Accordion>
  );
}