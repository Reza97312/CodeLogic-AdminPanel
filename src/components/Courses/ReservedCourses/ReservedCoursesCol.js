import { Link } from "react-router-dom";
import Avatar from "@components/avatar";

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
// import { active } from "sortablejs";

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
export const ReservedCourseCol = ({
  toggleAcceptModal,
  handleAcceptData,
  toggleDeleteModal,
}) => [
  {
    name: <span style={{ fontSize: "14px" }}>نام دانشجو</span>,
    minWidth: "300px",
    cell: (row) => (
      <div className="d-flex flex-column">
        <Link
          to={`/userdetails/${row.studentId}`}
          className="fw-bolder text-dark  "
        >
          {row.studentName}
        </Link>
      </div>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>نام دوره</span>,
    minWidth: "150px",
    cell: (row) => (
      <Link
        to={`/courses/view/${row.courseId}`}
        className="text-capitalize text-dark "
      >
        {row.courseName}
      </Link>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>وضعیت تایید</span>,
    minWidth: "150px",
    cell: (row) => (
      <Badge color={statusObj[row.accept]} pill>
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
          <DropdownItem
            style={{ width: "100%" }}
            onClick={() => {
              toggleAcceptModal(true);
              handleAcceptData({
                courseId: row.courseId,
                studentId: row.studentId,
              });
            }}
          >
            <Archive size={14} className="me-50" />
            <span className="align-middle">تایید رزرو</span>
          </DropdownItem>

          <DropdownItem
            style={{ width: "100%" }}
            onClick={() => {
              toggleDeleteModal(true);
              handleAcceptData({ reserveId: row.id });
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
