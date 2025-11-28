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

const CourseTabs = ({
  active,
  toggleTab,
  id,
  teacherId,
  students,
  payments,
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
        <Button
          style={{ marginRight: "10px" }}
          color="primary"
          onClick={toggle}
        >
          ساخت گروه
        </Button>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <CourseUsers students={students} />
        </TabPane>
        <TabPane tabId="2">
          <CourseGroups courseId={id} teacherId={teacherId} />
        </TabPane>
        <TabPane tabId="3">کامنت ها</TabPane>
        <TabPane tabId="4">
          <CoursePayments payments={payments} />
        </TabPane>
      </TabContent>

      {modalOpen && (
        <Modal isOpen={modalOpen} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>ایجاد گروه جدید</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormGroup>
                <Label for="groupName">نام گروه</Label>
                <Controller
                  name="groupName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input {...field} placeholder="نام گروه" />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label for="description">توضیحات</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <Input {...field} type="textarea" />}
                />
              </FormGroup>

              <FormGroup check className="mb-3">
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
                <Label check>فعال باشد</Label>
              </FormGroup>

              <div className="text-end">
                <Button color="secondary" onClick={toggle} className="me-2">
                  لغو
                </Button>
                <Button color="primary" type="submit">
                  ایجاد گروه
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      )}
    </Fragment>
  );
};
export default CourseTabs;
