// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from "reactstrap";

// ** Images
import medal from "@src/assets/images/illustration/badge.svg";

const CardMedal = () => {
  return (
    <Card className="card-congratulations-medal">
      <CardBody>
        <h5>خوش امدید 🎉</h5>
        <CardText className="font-small-3">
          با موفقیت وارد پنلتان شدید !
        </CardText>
        <div>
          <img
            className="userImage"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLZDp9FHrjfeJUMVQUOuLss5bUzT0QGWcaZA&s"
          />
        </div>
        <img className="congratulation-medal" src={medal} alt="Medal Pic" />
      </CardBody>
    </Card>
  );
};

export default CardMedal;
