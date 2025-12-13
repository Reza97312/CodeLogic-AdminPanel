import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import { store } from "@store/store";

import {
  MoreVertical,
  FileText,
  Trash2,
  Archive,
  UserPlus,
  Check,
  X,
  Trash,
} from "react-feather";

import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { toast } from "react-toastify";
import { PersianDateConverter } from "../../../utility/helper/PersianDateConverter";
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
export const NewsCommentsCol = ({
  toggleDeleteModal,
  handleCmId,
  toggleEditModal,
}) => [
  {
    name: <span style={{ fontSize: "14px" }}>عنوان کامنت</span>,
    minWidth: "150px",
    cell: (row) => <span className="text-capitalize">{row?.title}</span>,
  },

  {
    name: <span style={{ fontSize: "14px" }}>متن کامنت</span>,
    minWidth: "150px",
    cell: (row) => (
      <div className="d-flex flex-column text-truncate">
        <span className="fw-bolder">{row.describe}</span>
      </div>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>تاریخ درج</span>,
    minWidth: "300px",
    cell: (row) => (
      <div className="d-flex flex-column">
        <span className="fw-bolder">{PersianDateConverter(row.inserDate)}</span>
      </div>
    ),
  },
];
