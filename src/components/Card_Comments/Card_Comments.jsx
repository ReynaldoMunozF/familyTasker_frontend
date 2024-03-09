import Card from 'react-bootstrap/Card';
import star from "../../assets/img/star.png";
import "./Card_Comments.css";

export const CardComments =({commit,Title,}) =>{
  return (
    <Card style={{ width: '18rem', height:'18rem'}}>
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        
        <Card.Text>
          {commit}
        </Card.Text>
        <div className="star_container">
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
        </div>
      </Card.Body>
    </Card>
  );
}

