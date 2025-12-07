import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import { MoreVertical, FileText, Trash2 } from "react-feather";
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,} from "reactstrap";
import { PersianDateConverter } from "../../../utility/helper/PersianDateConverter";


const renderImage = (row) => {
  const img = row.currentImageAddressTumb || row.currentImageAddress;
  return (
    <Avatar className="me-1" img={img} width="32" height="32"/>
  );
};

const statusObj = {
  true: "light-success",
  false: "light-danger",
};

export const columns = ({ handleOpenModal, toggleDeleteModal, handleNewsId }) => [
  {
    name: <span style={{ fontSize: "14px" }}>خبر</span>,
    sortable: true,
    minWidth: "300px",
    sortField: "title",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderImage(row)}
        <div className="d-flex flex-column">
          <span className="fw-bolder">{row.title}</span>
        </div>
      </div>
    ),
  },
  {
    name: <span style={{ fontSize: "14px" }}>دسته بندی</span>,
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.addUserFullName,
    cell: (row) => <span>{row.newsCatregoryName}</span>,
  },
  {
    name: <span style={{ fontSize: "14px" }}>ساخته شده توسط</span>,
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.addUserFullName,
    cell: (row) => <span>{row.addUserFullName}</span>,
  },
  {
    name: <span style={{ fontSize: "14px" }}>تاریخ ایجاد</span>,
    minWidth: "180px",
    sortable: true,
    selector: (row) => row.insertDate,
    cell: (row) => <span>{PersianDateConverter(row.insertDate)}</span>,
  },
  {
    name: <span style={{ fontSize: "14px" }}>وضعیت</span>,
    minWidth: "120px",
    selector: (row) => row.isActive,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.isActive]} pill>
        {row.isActive ? "فعال" : "غیرفعال"}
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
              to={`/news-detail/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">مشاهده خبر</span>
            </DropdownItem>

            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/news/edit/${row.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleOpenModal(row);
              }}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>

            <DropdownItem
              onClick={() => {
                toggleDeleteModal(true)
                handleNewsId(row.id)
              }}
              tag="span"
              href="/"
              className="w-100"
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">حذف</span>
            </DropdownItem>

          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
