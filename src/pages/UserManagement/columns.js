import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
  UserPlus,
  Book,
  Eye,
  Key,
} from "react-feather";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
      "light-secondary",
    ];
  const color = states[stateNum];

  const userImg = row.pictureAddress;

  if (userImg && userImg !== "Not-set") {
    return <Avatar className="me-1" img={userImg} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={color}
        content={`${row.fname} ${row.lname}`}
      />
    );
  }
};

const renderRole = (row) => {
  const roleObj = {
    student: { class: "text-primary", icon: User },
    teacher: { class: "text-danger", icon: Book },
    admin: { class: "text-success", icon: Eye },
    administrator: { class: "text-info", icon: Edit2 },
    superadmin: { class: "text-warning", icon: Key },
  };

  const rolesArray = row.roles
    ? row.roles.map((r) => r.toLowerCase())
    : row.userRoles
    ? row.userRoles.split(",").map((r) => r.trim().toLowerCase())
    : [];

  return (
    <div className="d-flex align-items-center gap-1">
      {rolesArray.map((role) => {
        const RoleIcon = roleObj[role] ? roleObj[role].icon : User;
        const roleClass = roleObj[role] ? roleObj[role].class : "";
        return <RoleIcon key={role} size={18} className={`${roleClass}`} />;
      })}
    </div>
  );
};

export const columns = ({ handleOpenModal, handleDeleteUser }) => [
  {
    name: <span style={{ fontSize: "14px" }}>کاربران</span>,
    sortable: true,
    minWidth: "300px",
    sortField: "fname",
    selector: (row) => `${row.fname} ${row.lname}`,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">
              {row.fname} {row.lname}
            </span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.gmail}</small>
        </div>
      </div>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>نقش</span>,
    sortable: true,
    minWidth: "172px",
    sortField: "userRoles",
    selector: (row) => row.userRoles,
    cell: (row) => renderRole(row),
  },
  {
    name: <span style={{ fontSize: "14px" }}>تلفن همراه</span>,
    minWidth: "138px",
    sortable: true,
    sortField: "phoneNumber",
    selector: (row) => row.phoneNumber,
    cell: (row) => <span className="text-capitalize">{row.phoneNumber}</span>,
  },
  {
    name: <span style={{ fontSize: "14px" }}>دسترسی</span>,
    minWidth: "230px",
    sortable: false,
    cell: (row) => (
      <div
        onClick={() => handleOpenModal(row)}
        className="d-flex align-items-center cursor-pointer"
      >
        <UserPlus size={18} />
      </div>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>وضعیت</span>,
    minWidth: "138px",
    sortable: true,
    sortField: "active",
    selector: (row) => row.active,
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={row.active ? "light-success" : "light-secondary"}
        pill
      >
        {row.active ? "فعال" : "غیرفعال"}
      </Badge>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>اقدامات</span>,
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/apps/user/view/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزئیات کاربر</span>
            </DropdownItem>
            <Link to={`/edituser/${row.id}`}>
              <DropdownItem className="w-100">
                <Archive size={14} className="me-50" />
                <span className="align-middle">ویرایش</span>
              </DropdownItem>
            </Link>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteUser(row.id);
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">حذف کاربر</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
