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
export const CourseUsersCol = ({ handleOpenModal, toggleSidebar }) => [
  {
    name: <span style={{ fontSize: "14px" }}>نام کاربر</span>,
    minWidth: "300px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {renderCourseImage(row)}
        <div className="d-flex flex-column">
          <Link to={`/userdetails/${row.user.id}`} className="fw-bolder">
            {row.user.fName}
            {row.user.lName}
          </Link>
        </div>
      </div>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>ایمیل کاربر</span>,
    minWidth: "150px",
    cell: (row) => <span className="text-capitalize">{row.user.gmail}</span>,
  },

  //   {
  //     name: <span style={{ fontSize: "14px" }}>انقضا</span>,
  //     minWidth: "150px",
  //     cell: (row) =>
  //       row.isExpire ? (
  //         <Check size={20} color="green" />
  //       ) : (
  //         <X size={20} color="red" />
  //       ),
  //   },

  //   {
  //     name: <span style={{ fontSize: "14px" }}>تاریخ شروع</span>,
  //     minWidth: "150px",
  //     cell: (row) => (
  //       <span className="text-capitalize">
  //         {row.startTime.slice(0, 10) || "—"}
  //       </span>
  //     ),
  //   },

  //   {
  //     name: <span style={{ fontSize: "14px" }}>فعال / غیرفعال</span>,
  //     minWidth: "150px",
  //     cell: (row) => (
  //       <span>{row.}</span>
  //     ),
  //   },

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
            tag={Link}
            to={`/userdetails/${row.user.id}`}
          >
            <FileText size={14} className="me-50" />
            <span className="align-middle">جزئیات کاربر</span>
          </DropdownItem>

          {/* <DropdownItem onClick={() => toggleSidebar()}>
            <Archive size={14} className="me-50" />
            <span className="align-middle">ویرایش</span>
          </DropdownItem> */}

          {/* <DropdownItem
            onClick={(e) => {
              e.preventDefault();
              store.dispatch(deleteUser(row.id));
            }}
          >
            <Trash2 size={14} className="me-50" />
            <span className="align-middle">حذف</span>
          </DropdownItem> */}
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
];
