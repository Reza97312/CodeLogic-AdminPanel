// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import UserTabs from "./courseTabs";
import PlanCard from "./PlanCard";
import UserInfoCard from "./CourseInfoCard";
import { useQuery } from "@tanstack/react-query";
// ** Styles
import "@styles/react/apps/app-users.scss";
import { GetCourseById } from "../../../../core/services/api/get/Courses/GetCourseByID";
import CourseInfoCard from "./CourseInfoCard";
import loading from "../../../../assets/images/A/loading.gif";
import CourseTabs from "./courseTabs";

const Cview = () => {
  // ** Hooks
  const { id } = useParams();
  const { data: courseData = {}, isPending } = useQuery({
    queryKey: ["COURSEBYID"],
    queryFn: () => GetCourseById(id),
  });
  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return courseData ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          {isPending ? (
            <img className="mx-auto" src={loading} />
          ) : (
            <CourseInfoCard selectedCourse={courseData} />
          )}
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <CourseTabs
            payments={courseData?.payments}
            id={id}
            students={courseData?.courseStudent}
            teacherId={courseData?.teacherId}
            active={active}
            toggleTab={toggleTab}
          />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{" "}
        <Link to="/apps/user/list">Users List</Link>
      </div>
    </Alert>
  );
};
export default Cview;
