import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Row, Col } from "reactstrap";
import WizardModern from "./WizardModern";
import BreadCrumbs from "@components/breadcrumbs";

const EditUser = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.allData.find((u) => u.id === parseInt(id))
  );

  if (!user) return <p>کاربر یافت نشد</p>;

  return (
    <Fragment>
      <BreadCrumbs title="فرم چند مرحله ای" data={[{ title: "فرم" }]} />
      <Row>
        <Col sm="12">
          <WizardModern />
        </Col>
      </Row>
    </Fragment>
  );
};

export default EditUser;
