// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from "reactstrap";

// ** Images
import medal from "@src/assets/images/illustration/badge.svg";

const CardMedal = ({ item }) => {
  return (
    <Card className="card-congratulations-medal">
      <CardBody>
        <h5>خوش اومدی {item.fName}🎉</h5>
        <CardText className="font-small-3">با موفقیت وارد پنل شدی !</CardText>
        <div>
          <img
            style={{ width: "300px", height: "200px", borderRadius: "15px" }}
            src={item.currentPictureAddress}
          />
        </div>
        <img className="congratulation-medal" src={medal} alt="Medal Pic" />
      </CardBody>
    </Card>
  );
};

export default CardMedal;
