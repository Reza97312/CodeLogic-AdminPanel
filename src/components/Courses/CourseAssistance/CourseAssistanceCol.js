import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import { store } from "@store/store";
import { PersianDateConverter } from "../../../utility/helper/PersianDateConverter";
import {
  MoreVertical,
  FileText,
  Trash2,
  Archive,
  UserPlus,
  Check,
  X,
} from "react-feather";

import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const renderCourseImage = (row) => {
  if (row.user.currentPictureAddress) {
    return (
      <Avatar
        className="me-1"
        img={row.user.currentPictureAddress}
        width="32"
        height="32"
      />
    );
  }
  return (
    <Avatar
      initials
      className="me-1"
      color="light-primary"
      content={row.user.fName || "Course"}
    />
  );
};
const statusObj = {
  true: "light-success",
  false: "light-secondary",
};
export const CourseAssistanceCol = ({ toggleEdit, toggleAssistanceModal }) => [
  {
    name: <span style={{ fontSize: "14px" }}>نام منتور</span>,
    minWidth: "300px",
    cell: (row) => (
      <div className="d-flex flex-column">
        <span className="fw-bolder">{row.assistanceName}</span>
      </div>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>تاریخ ایجاد</span>,
    minWidth: "150px",
    cell: (row) => (
      <span className="text-capitalize">
        {PersianDateConverter(row.inserDate)}
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
            style={{ width: "100%" }}
            onClick={() => {
              toggleEdit(row);
              toggleAssistanceModal(true);
            }}
          >
            <FileText size={14} className="me-50" />
            <span className="align-middle">ویرایش</span>
          </DropdownItem>

          {/* <DropdownItem>
            <Trash2 size={14} className="me-50" />
            <span className="align-middle">حذف</span>
          </DropdownItem> */}
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
];
