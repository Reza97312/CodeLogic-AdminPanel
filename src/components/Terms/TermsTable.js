// ** React Imports
import { Fragment, useState } from "react";
import loading from "../../assets/images/A/loading.gif";
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

import { TermsCol } from "./TermsCol";
import CreateTermModal from "./CreateTerm";
import TermTimeModal from "./CreateTermTime";

const TermsTable = ({ allTerms }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
    window.scrollTo(0, 0);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentData = allTerms.slice(startIndex, endIndex);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const toggleCreate = (val) => setOpenCreateModal(val);
  const [editData, setEditData] = useState("");
  const handleEdit = (values) => setEditData(values);
  const [openCreateTime, setOpenCreateTime] = useState(false);
  const toggleTime = (bool) => setOpenCreateTime(bool);
  const tableColumns = TermsCol({
    handleEdit,
    toggleCreate,
    toggleTime,
  });
  const CustomPagination = () => {
    const count = Math.ceil((allTerms.length || 0) / rowsPerPage);

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
        <CardHeader tag="h4">
          مدیریت ترم ها
          <div>
            <Button
              className="me-2"
              onClick={() => {
                setOpenCreateModal(true);
                setEditData("");
              }}
              color="primary"
            >
              افزودن ترم
            </Button>
            <Button
              onClick={() => {
                setOpenCreateTime(true);
                setEditData("");
              }}
              color="primary"
            >
              افزودن زمان
            </Button>
          </div>
        </CardHeader>
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
      </Card>
      {openCreateModal && (
        <CreateTermModal
          editData={editData}
          isOpen={openCreateModal}
          toggle={toggleCreate}
        />
      )}
      {openCreateTime && (
        <TermTimeModal
          isOpen={openCreateTime}
          toggle={toggleTime}
          editData={editData}
        />
      )}
    </Fragment>
  );
};

export default TermsTable;
