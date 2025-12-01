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
  CardHeader,
} from "reactstrap";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { CourseAssistanceCol } from "./CourseAssistanceCol";
import AddAssistanceModal from "./AddAssistanceModal";

const CourseAssistanceTable = ({ AssistanceData, courseId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sort, setSort] = useState("DESC");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openAssistanceModal, setOpenAssistanceModal] = useState(false);
  const [EditData, setEditData] = useState(null);
  const toggleEdit = (value) => setEditData(value);
  const toggleAssistanceModal = (val) => setOpenAssistanceModal(val);

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

  const tableColumns = CourseAssistanceCol({
    toggleEdit,
    toggleAssistanceModal,
  });

  const CustomPagination = () => {
    const count = Math.ceil((AssistanceData.length || 0) / rowsPerPage);

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
        <div className="react-dataTable">
          <Button
            onClick={() => {
              setOpenAssistanceModal(true);
              setEditData(null);
            }}
            style={{ marginBottom: "7px" }}
            color="primary"
          >
            افزودن منتور
          </Button>
          <DataTable
            noHeader
            pagination
            paginationServer
            sortServer
            responsive
            columns={tableColumns}
            sortIcon={<ChevronDown />}
            data={AssistanceData}
            paginationComponent={CustomPagination}
          />
        </div>
      </Card>
      {openAssistanceModal && (
        <AddAssistanceModal
          isOpen={openAssistanceModal}
          toggleAssistanceModal={toggleAssistanceModal}
          courseId={courseId}
          EditData={EditData}
        />
      )}
    </Fragment>
  );
};

export default CourseAssistanceTable;
