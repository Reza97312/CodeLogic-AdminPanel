// ** React Imports
import { Fragment, useState } from "react";
import loading from "../../../assets/images/A/loading.gif";
// ** Invoice List Sidebar

// ** Table Columns

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
  CardHeader,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { useMutation, useQuery } from "@tanstack/react-query";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { GetCourseReserved } from "../../../core/services/api/get/Courses/GetCourseReserve";
import { ReservedCourseCol } from "./ReservedCoursesCol";
import AcceptReserveModal from "./AcceptReserveModal";
import DeleteReserveModal from "./DeleteReserveModal";

const ReservedCourseTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const toggleDeleteModal = (value) => setOpenDeleteModal(value);

  const toggleAcceptModal = (val) => setOpenAcceptModal(val);
  const [AcceptData, setAcceptData] = useState(null);
  const handleAcceptData = (dt) => setAcceptData(dt);
  const { data: reserveData = [], isPending } = useQuery({
    queryKey: ["GETRESERVEDCOURSE"],
    queryFn: () => GetCourseReserved(),
  });

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

  const tableColumns = ReservedCourseCol({
    toggleAcceptModal,
    handleAcceptData,
    toggleDeleteModal,
  });
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentData = reserveData.slice(startIndex, endIndex);

  const CustomPagination = () => {
    const count = Math.ceil((reserveData.length || 0) / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count}
        activeClassName="active"
        onPageChange={handlePagination}
        forcePage={currentPage - 1}
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
        <CardHeader tag="h4">همه دوره های رزرو شده توسط کاربر</CardHeader>
        {isPending ? (
          <img className="mx-auto" src={loading} />
        ) : (
          <div className="react-dataTable">
            <DataTable
              noHeader
              pagination
              sortServer
              responsive
              columns={tableColumns}
              sortIcon={<ChevronDown />}
              data={currentData}
              onSort={handleSort}
              paginationComponent={CustomPagination}
            />
          </div>
        )}
      </Card>
      {openAcceptModal && (
        <AcceptReserveModal
          isOpen={openAcceptModal}
          toggleAcceptModal={toggleAcceptModal}
          courseId={AcceptData.courseId}
          studentId={AcceptData.studentId}
        />
      )}
      {openDeleteModal && (
        <DeleteReserveModal
          isOpen={openDeleteModal}
          toggleDeleteModal={toggleDeleteModal}
          reserveId={AcceptData.reserveId}
        />
      )}
    </Fragment>
  );
};

export default ReservedCourseTable;
