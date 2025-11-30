// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import {
  User,
  Lock,
  Bookmark,
  Bell,
  Link,
  Book,
  BookOpen,
  CreditCard,
  MessageCircle,
} from "react-feather";

// ** User Components

import UserReservedCourses from "./UserReservedCourses";
import UserMyCourses from "./UserMyCourses";
import UserComments from "./UserComments";
import UserPayments from "./UserPayments";
import UserSocial from "./UserSocial";

const UserTabs = ({ active, toggleTab, user }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <BookOpen className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های من</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های رزرو شده</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <MessageCircle className="font-medium-3 me-50" />
            <span className="fw-bold"> کامنت ها </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <CreditCard className="font-medium-3 me-50" />
            <span className="fw-bold">پرداختی ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold">شبکه های اجتماعی</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <UserMyCourses />
        </TabPane>
        <TabPane tabId="2">
          <UserReservedCourses />
        </TabPane>
        <TabPane tabId="3">
          <UserComments />
        </TabPane>
        <TabPane tabId="4">
          <UserPayments />
        </TabPane>
        <TabPane tabId="5">
          <UserSocial user={user} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
