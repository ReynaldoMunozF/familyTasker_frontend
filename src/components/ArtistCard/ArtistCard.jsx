import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const ArtistCard = ({ artist, selectArtist, nombre ,BtnColor,photo, description}) => {
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img
        variant="top"
        src={photo}
      />
      <Card.Body>
        <Card.Title>{artist}</Card.Title>
        <Card.Text className="text-center" >
        {description}
        </Card.Text>

        <Button variant={BtnColor} onClick={selectArtist}>{nombre}</Button>
      </Card.Body>
    </Card>
  );
};
