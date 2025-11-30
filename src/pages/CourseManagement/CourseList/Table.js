// ** React Imports
import { Fragment, useState } from "react";
import loading from "../../../assets/images/A/loading.gif";
// ** Invoice List Sidebar

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { ChevronDown } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { useMutation, useQuery } from "@tanstack/react-query";
import { GetAllCourses } from "../../../core/services/api/get/Courses/GetAllCourses";
import { useDebounce } from "use-debounce";
import SidebarEditCourses from "./EditCourseSidebar";
import { Link, useNavigate } from "react-router-dom";
import { DeleteCourse } from "../../../core/services/api/delete/DeleteCourse";
import { toast } from "react-toastify";
import SetActivateCourse from "../../../components/Courses/SetActivateCourse/SetActivateCourse";

const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label style={{ fontSize: "17px" }} htmlFor="rows-per-page">
              تعداد نمایش :
            </label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>

        <Col xl="6" className="d-flex justify-content-end p-0 mt-1">
          <div className="d-flex align-items-center me-1">
            <label className="mb-0" style={{ fontSize: "17px" }}>
              جستجو
            </label>
            <Input
              className="ms-50"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="نام دوره..."
            />
          </div>

          <Button color="primary" tag={Link} to={"/courses/create"}>
            اضافه کردن دوره
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery] = useDebounce(searchTerm, 700);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sort, setSort] = useState("DESC");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [OpenActiveModal, setOpenActiveModal] = useState(false);
  const [activeData, setActiveData] = useState({});

  const toggleActiveModal = (value) => {
    setOpenActiveModal(value);
  };
  const getActiveData = (d) => {
    setActiveData(d);
  };
  const { data: CoursesData = {}, isPending } = useQuery({
    queryKey: ["ALLCOURSES", currentPage, rowsPerPage, searchQuery],
    queryFn: () =>
      GetAllCourses({
        PageNumber: currentPage,
        RowsOfPage: rowsPerPage,
        Query: searchQuery,
      }),
  });

  const { mutate: deleteCourse, isPending: DeleteCoursePending } = useMutation({
    mutationKey: ["QUERYKEY"],
    mutationFn: (value) => DeleteCourse(value),
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  const courses = CoursesData?.courseDtos || [];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
    window.scrollTo(0, 0);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const tableColumns = columns({
    deleteCourse,
    getActiveData,
    toggleActiveModal,
    toggleSidebar,
    handleOpenModal: () => {},
  });

  const CustomPagination = () => {
    const count = Math.ceil((CoursesData.totalCount || 0) / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count}
        activeClassName="active"
        onPageChange={handlePagination}
        containerClassName="pagination react-paginate justify-content-end mt-2"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        nextClassName="page-item next"
        nextLinkClassName="page-link"
        previousClassName="page-item prev"
        previousLinkClassName="page-link"
      />
    );
  };

  return (
    <Fragment>
      <Card className="overflow-hidden">
        {isPending ? (
          <img className="mx-auto" src={loading} />
        ) : (
          <div className="react-dataTable">
            <DataTable
              noHeader
              subHeader
              pagination
              paginationServer
              sortServer
              responsive
              columns={tableColumns}
              sortIcon={<ChevronDown />}
              data={courses}
              onSort={handleSort}
              paginationComponent={CustomPagination}
              subHeaderComponent={
                <CustomHeader
                  toggleSidebar={toggleSidebar}
                  rowsPerPage={rowsPerPage}
                  handlePerPage={handlePerPage}
                  searchTerm={searchTerm}
                  handleFilter={handleFilter}
                />
              }
            />
          </div>
        )}
      </Card>

      <SidebarEditCourses open={sidebarOpen} toggleSidebar={toggleSidebar} />
      {OpenActiveModal && (
        <SetActivateCourse
          isOpen={OpenActiveModal}
          activeData={activeData}
          toggleActiveModal={toggleActiveModal}
        />
      )}
    </Fragment>
  );
};

export default UsersList;
