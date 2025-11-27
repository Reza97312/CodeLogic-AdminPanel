import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import { store } from "@store/store";
import { deleteUser, getUser } from "./store";

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
export const columns = ({ handleOpenModal, toggleSidebar }) => [
  {
    name: <span style={{ fontSize: "14px" }}>دوره</span>,
    minWidth: "300px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {renderCourseImage(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/courses/view/${row.id}`}
            className="text-body"
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className="fw-bolder">{row.title}</span>
          </Link>
        </div>
      </div>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>قیمت</span>,
    minWidth: "150px",
    cell: (row) => (
      <span className="text-capitalize">{row.cost.toLocaleString()} تومان</span>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>انقضا</span>,
    minWidth: "150px",
    cell: (row) =>
      row.isExpire ? (
        <Check size={20} color="green" />
      ) : (
        <X size={20} color="red" />
      ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>تاریخ شروع</span>,
    minWidth: "150px",
    cell: (row) => (
      <span className="text-capitalize">
        {row.startTime.slice(0, 10) || "—"}
      </span>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>فعال / غیرفعال</span>,
    minWidth: "150px",
    cell: (row) => (
      <Badge color={statusObj[row.isActive]} pill>
        {row.isActive ? "فعال" : "غیرفعال"}
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
            tag={Link}
            to={`/courses/view/${row.courseId}`}
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <FileText size={14} className="me-50" />
            <span className="align-middle">جزئیات دوره</span>
          </DropdownItem>

          <DropdownItem onClick={() => toggleSidebar()}>
            <Archive size={14} className="me-50" />
            <span className="align-middle">ویرایش</span>
          </DropdownItem>

          <DropdownItem
            onClick={(e) => {
              e.preventDefault();
              store.dispatch(deleteUser(row.id));
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
