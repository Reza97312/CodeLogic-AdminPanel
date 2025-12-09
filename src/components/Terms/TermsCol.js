import { Link } from "react-router-dom";
import Avatar from "@components/avatar";

import { MoreVertical, Trash2 } from "react-feather";

import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { PersianDateConverter } from "../../utility/helper/PersianDateConverter.js";
const renderCourseImage = (row) => {
  if (row.imageAddress) {
    return (
      <Avatar className="me-1" img={row.imageAddress} width="32" height="32" />
    );
  }
  return (
    <Avatar
      initials
      className="me-1"
      color="light-primary"
      content={row.title || "Course"}
    />
  );
};
const statusObj = {
  true: "light-success",
  false: "light-secondary",
};
export const TermsCol = ({
  handleEdit,
  toggleCreate,
  toggleTime,
  toggleDetail,
}) => [
  {
    name: <span style={{ fontSize: "14px" }}>نام ترم</span>,
    minWidth: "300px",
    cell: (row) => (
      <div className="d-flex flex-column">
        <span>{row.termName}</span>
      </div>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>تاریخ شروع</span>,
    minWidth: "150px",
    cell: (row) => <span>{PersianDateConverter(row.startDate)}</span>,
  },
  {
    name: <span style={{ fontSize: "14px" }}>تاریخ پایان</span>,
    minWidth: "150px",
    cell: (row) => <span>{PersianDateConverter(row.endDate)}</span>,
  },

  {
    name: <span style={{ fontSize: "14px" }}>وضعیت </span>,
    minWidth: "150px",
    cell: (row) => (
      <Badge color={row.expire ? "danger" : "success"} pill>
        {row.expire ? "منقضی شده" : "منقضی نشده"}
      </Badge>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>اقدامات</span>,
    minWidth: "120px",
    cell: (row) => (
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              handleEdit(row), toggleCreate(true);
            }}
            style={{ width: "100%" }}
          >
            <div className="align-middle">ویرایش ترم</div>
          </DropdownItem>

          <DropdownItem
            onClick={() => {
              toggleTime(true);
              handleEdit(row);
            }}
            style={{ width: "100%" }}
          >
            <span className="align-middle">افزودن زمان برای ترم</span>
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              toggleDetail(true);
              handleEdit(row);
            }}
            style={{ width: "100%" }}
          >
            <span className="align-middle">جزییات ترم</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
];
