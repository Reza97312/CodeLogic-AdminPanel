// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
// import WizardModernVertical from "./WizardModernVertical";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";
import CreateCourseWizard from "./CreateCourseWizard";

const CourseWizardIndex = () => {
  return (
    <Fragment>
      <BreadCrumbs
        title="ساخت دوره"
        data={[{ title: "مدیریت دوره" }, { title: "ساخت دوره" }]}
      />
      <Row>
        <Col sm="12">
          <CreateCourseWizard />
        </Col>
      </Row>
    </Fragment>
  );
};
export default CourseWizardIndex;
