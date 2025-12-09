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
  Eye,
} from "react-feather";

import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { toast } from "react-toastify";

const renderUserImage = (row) => {
  if (row.pictureAddress) {
    return (
      <Avatar
        className="me-1"
        img={row.pictureAddress}
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
      content={row.userFullName || "Course"}
    />
  );
};
const statusObj = {
  true: "light-success",
  false: "light-secondary",
};
export const CommentsCol = ({
  toggleReplyModal,
  handleCourseId,
  toggleDeleteModal,
  handleCmId,
  toggleEditModal,
}) => [
  {
    name: <span style={{ fontSize: "14px" }}>نام کاربر</span>,
    minWidth: "300px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {renderUserImage(row)}
        <div className="d-flex flex-column">
          <span className="fw-bolder">{row.userFullName}</span>
        </div>
      </div>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>عنوان کامنت</span>,
    minWidth: "150px",
    cell: (row) => <span className="text-capitalize">{row.commentTitle}</span>,
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
    name: <span style={{ fontSize: "14px" }}>عنوان دوره</span>,
    minWidth: "150px",
    cell: (row) => (
      <div className="d-flex flex-column text-truncate">
        <span className="fw-bolder">{row.courseTitle}</span>
      </div>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>ریپلای ها</span>,
    minWidth: "150px",
    cell: (row) => (
      <div className="d-flex flex-column text-truncate">
        <span
          onClick={() => {
            toggleReplyModal(true),
              handleCourseId(row.courseId),
              handleCmId(row.id);
          }}
          style={{ cursor: "pointer" }}
          className="fw-bolder ms-2 "
        >
          <Eye />
        </span>
      </div>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>وضعیت تایید</span>,
    minWidth: "150px",
    cell: (row) => (
      <Badge color={row.accept ? "light-success" : "light-secondary"} pill>
        {row.accept ? "تایید شده" : "تایید نشده"}
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
          {row.accept ? (
            ""
          ) : (
            <DropdownItem
              style={{ width: "100%" }}
              onClick={() => {
                toggleEditModal(true);
                handleCmId(row.id);
              }}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">تایید</span>
            </DropdownItem>
          )}

          <DropdownItem
            style={{ width: "100%" }}
            onClick={() => {
              toggleDeleteModal(true);
              handleCmId(row.id);
            }}
          >
            <Trash2 size={14} className="me-50" />
            <span className="align-middle">حذف</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
];
