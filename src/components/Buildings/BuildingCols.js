import Avatar from "@components/avatar";
import { MoreVertical, Eye, File } from "react-feather";
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
      content={row.user.fName}
    />
  );
};
const statusObj = {
  true: "light-success",
  false: "light-secondary",
};
export const BuildingCol = ({
  toggleMap,
  handleEdit,
  toggleActive,
  toggleDetail,
  handleDetail,
  handleMap,
  toggleEdit,
}) => [
  {
    name: <span style={{ fontSize: "14px" }}>نام ساختمان </span>,
    minWidth: "300px",
    cell: (row) => (
      <div className="d-flex flex-column">
        <span>{row.buildingName}</span>
      </div>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>طبقه</span>,
    minWidth: "300px",
    cell: (row) => <span className=" ms-1 fw-bolder">{row.floor}</span>,
  },

  {
    name: <span style={{ fontSize: "14px" }}>وضعیت </span>,
    minWidth: "150px",
    cell: (row) => (
      <Badge color={row.active ? "success" : "danger"} pill>
        {row.active ? "فعال" : "غیرفعال"}
      </Badge>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>نشانی </span>,
    minWidth: "150px",
    cell: (row) => (
      <span
        onClick={() => {
          handleMap(row);
          toggleMap(true);
        }}
        style={{ cursor: "pointer", marginRight: "5px" }}
      >
        <Eye />
      </span>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>اقدامات</span>,
    minWidth: "120px",
    center: true,
    cell: (row) => (
      <div className="d-flex justify-content-between">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                toggleEdit(true);
                handleEdit(row);
              }}
              style={{ width: "100%" }}
            >
              <span className="align-middle">ویرایش ساختمان</span>
            </DropdownItem>

            <DropdownItem
              onClick={() => {
                toggleActive(true);
                handleEdit(row);
              }}
              style={{ width: "100%" }}
            >
              <span className="align-middle">ویرایش وضعیت</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <span
          onClick={() => {
            handleDetail(row);
            toggleDetail(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <File size={18} />
        </span>
      </div>
    ),
  },
];
