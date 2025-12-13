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

import { Form } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import NewsDetailCards from "./NewsDetailCards";
import NewsCommentsTable from "../Comments/NewsCommentsTable";

const NewsTabs = ({ newsData, isPending, active, toggleTab }) => {
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
            <span className="fw-bold">جزییات</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <MessageSquare className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <NewsDetailCards newsData={newsData} isPending={isPending} />
        </TabPane>
        <TabPane tabId="2">
          <NewsCommentsTable id={newsData?.detailsNewsDto?.id} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default NewsTabs;
