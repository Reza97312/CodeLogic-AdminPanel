// ** React Imports
import { Fragment, useState } from "react";
import loading from "../../../assets/images/A/loading.gif";
// ** Invoice List Sidebar
// ** Table Column

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

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
// import SidebarCreateGroup from "./CreateGroup";
// // import { CourseUsersCol } from "./UsersColumns";
// import { GetCourseGroups } from "../../../core/services/api/get/Courses/GetCourseGroups";
import { PaymentsCol } from "./PaymentsCol";

const CoursePaymentsTable = ({ courseId, teacherId, payments }) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery] = useDebounce(searchTerm, 700);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sort, setSort] = useState("DESC");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //   const { data: GroupsData = [], isPending } = useQuery({
  //     queryKey: ["COURSEGROUPS"],
  //     queryFn: () =>
  //       GetCourseGroups({
  //         course: courseId,
  //         teacher: teacherId,
  //       }),
  //   });

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

  const tableColumns = PaymentsCol({ handleOpenModal: () => {} });

  const CustomPagination = () => {
    const count = Math.ceil((payments.length || 0) / rowsPerPage);

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
        {/* {isPending ? (
          <img className="mx-auto" src={loading} />
        ) : ( */}
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            paginationServer
            sortServer
            responsive
            columns={tableColumns}
            sortIcon={<ChevronDown />}
            data={payments}
            onSort={handleSort}
            paginationComponent={CustomPagination}
            toggleSidebar={toggleSidebar}
          />
        </div>
        {/* )} */}
      </Card>
      {/* 
      <SidebarCreateGroup open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  );
};

export default CoursePaymentsTable;
