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
} from "react-feather";

import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
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
export const PaymentsCol = ({ handleOpenModal, toggleSidebar }) => [
  {
    name: <span style={{ fontSize: "14px" }}>تاریخ پرداخت</span>,
    minWidth: "300px",
    cell: (row) => (
      //   <div className="d-flex align-items-center">
      //     {renderCourseImage(row)}
      <div className="d-flex flex-column">
        <span className="fw-bolder">
          {PersianDateConverter(row.PeymentDate)}
        </span>
      </div>
      //   </div>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>مبلغ </span>,
    minWidth: "150px",
    cell: (row) => (
      <span className="text-capitalize">{row.Paid.toLocaleString()}تومان</span>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>تایید شده</span>,
    minWidth: "150px",
    cell: (row) =>
      row.accept ? (
        <Check size={20} color="green" />
      ) : (
        <X size={20} color="red" />
      ),
  },
];
