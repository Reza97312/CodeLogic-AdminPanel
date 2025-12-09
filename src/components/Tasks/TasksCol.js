import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import DOMPurify from "dompurify";
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
export const TasksCol = ({ toggleCreate, handleEdit, toggleDetail }) => [
  {
    name: <span style={{ fontSize: "14px" }}>نام تسک</span>,
    minWidth: "300px",
    cell: (row) => (
      <div className="d-flex flex-column">
        <span>{row.worktitle}</span>
      </div>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>توضیحات</span>,
    minWidth: "150px",
    cell: (row) => (
      <span>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(row.workDescribe),
          }}
        />
      </span>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>تاریخ تسک</span>,
    minWidth: "150px",
    cell: (row) => <span>{PersianDateConverter(row.workDate)}</span>,
  },
  {
    name: <span style={{ fontSize: "14px" }}>نام منتور</span>,
    minWidth: "150px",
    cell: (row) => (
      <span>
        {row.assistance.user.fName} {row.assistance.user.lName}
      </span>
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
              toggleDetail(true);
              handleEdit(row);
            }}
            style={{ width: "100%" }}
          >
            <div className="align-middle">جزییات تسک </div>
          </DropdownItem>

          <DropdownItem
            onClick={() => {
              toggleCreate(true);
              handleEdit(row);
            }}
            style={{ width: "100%" }}
          >
            <span className="align-middle">ویرایش تسک</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
];
