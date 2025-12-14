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
  Eye,
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
export const NewsCol = ({ toggleActive, handleEdit }) => [
  {
    name: <span style={{ fontSize: "14px" }}>عنوان</span>,
    minWidth: "300px",
    cell: (row) => (
      <div className="d-flex flex-column">
        <Link
          style={{ color: "black", cursor: "pointer" }}
          to={`/news-detail/${row.id}`}
          className="fw-bolder text-dark  "
        >
          {row.title}
        </Link>
      </div>
    ),
  },

  {
    name: <span style={{ fontSize: "14px" }}>دسته بندی</span>,
    minWidth: "150px",
    cell: (row) => <span>{row.newsCatregoryName}</span>,
  },
  {
    name: <span style={{ fontSize: "14px" }}>تعداد بازدید</span>,
    minWidth: "150px",
    cell: (row) => <span>{row.currentView}</span>,
  },

  {
    name: <span style={{ fontSize: "14px" }}>وضعیت</span>,
    minWidth: "150px",
    cell: (row) => (
      <Badge color={row.active ? "success" : "danger"} pill>
        {row.active ? "فعال" : "غیر فعال"}
      </Badge>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>آخرین بروزرسانی</span>,
    minWidth: "150px",
    cell: (row) => <span>{PersianDateConverter(row.updateDate)}</span>,
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
              toggleActive(true);
              handleEdit(row);
            }}
            style={{ width: "100%" }}
          >
            <Archive size={14} className="me-50" />
            <span className="align-middle">ویرایش وضعیت</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={`/news-detail/${row.id}`}
            style={{ width: "100%" }}
          >
            <Eye size={14} className="me-50" />
            <span className="align-middle">مشاهده جزییات</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
];
