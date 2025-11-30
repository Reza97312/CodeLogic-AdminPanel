// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

// ** Icons Imports
import {
  User,
  Lock,
  Bookmark,
  Bell,
  Link,
  Book,
  Users,
  MessageSquare,
  Layers,
  UserMinus,
  UserCheck,
} from "react-feather";

// ** User Components
// import InvoiceList from './InvoiceList'
import SecurityTab from "./SecurityTab";
import Connections from "./Connections";
import BillingPlanTab from "./BillingTab";
import UserTimeline from "./UserTimeline";
import Notifications from "./Notifications";
import UserProjectsList from "./UserProjectsList";
import CourseView from "../../../../pages/CourseManagement/CourseView/CourseView";
import CoursesManagement from "../../../../pages/CourseManagement/CourseList/CoursesManagement";
import { Form } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import CoursesUserList from "./CourseUsersList/CoursesUserList";
import CourseGroups from "../../../../pages/CourseManagement/CourseGroups/CourseGroups";
import CourseUsers from "../../../../pages/CourseManagement/CourseUsers/CourseUsers";
import CoursePayments from "../../../../pages/CourseManagement/CoursePaymentsPage/CoursePayments";
import CourseComments from "../../../../pages/CourseManagement/CourseComments/CourseComments";

const CourseTabs = ({
  active,
  toggleTab,
  id,
  teacherId,
  students,
  payments,
  teacherName,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggle = () => setModalOpen(!modalOpen);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      groupName: "",
      description: "",
      isActive: true,
    },
  });

  const handleFormSubmit = (data) => {
    onSubmitGroup(data);
    reset();
    toggle();
  };
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <UserCheck className="font-medium-3 me-50" />
            <span className="fw-bold">کاربران</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold">گروه ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <MessageSquare className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Layers className="font-medium-3 me-50" />
            <span className="fw-bold">پرداختی ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <CourseUsers students={students} />
        </TabPane>
        <TabPane tabId="2">
          <CourseGroups
            teacherName={teacherName}
            courseId={id}
            teacherId={teacherId}
          />
        </TabPane>
        <TabPane tabId="3">
          <CourseComments id={id} />
        </TabPane>
        <TabPane tabId="4">
          <CoursePayments payments={payments} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default CourseTabs;
