// ** React Imports
import { Fragment, useState } from "react";
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
import { TasksCol } from "./TasksCol.js";
import CreateTask from "./CreateTask.jsx";
import TaskDetailsModal from "./TaskDetailsModal.jsx";
const TasksTable = ({ taskData }) => {
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

  const handleFilter = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = taskData?.slice(startIndex, endIndex);
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };
  //// create and update task ////
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const toggleCreate = (bool) => setOpenCreateModal(bool);
  const [editData, setEditData] = useState(null);
  const handleEdit = (vals) => setEditData(vals);
  ///// task details ////
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const toggleDetail = (boool) => setOpenDetailModal(boool);

  const tableColumns = TasksCol({
    toggleCreate,
    handleEdit,
    toggleDetail,
  });
  const CustomPagination = () => {
    const count = Math.ceil((taskData?.length || 0) / rowsPerPage);

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
          مدیریت تسک ها
          <div>
            <Button
              onClick={() => {
                setOpenCreateModal(true);
                setEditData(null);
              }}
              color="primary"
            >
              افرودن تسک
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
        <CreateTask
          toggle={toggleCreate}
          isOpen={openCreateModal}
          editData={editData}
        />
      )}
      {openDetailModal && (
        <TaskDetailsModal
          isOpen={openDetailModal}
          toggle={toggleDetail}
          id={editData.id}
        />
      )}
    </Fragment>
  );
};

export default TasksTable;
