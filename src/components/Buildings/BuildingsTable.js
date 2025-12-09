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
import { BuildingCol } from "./BuildingCols";
import MapModal from "./MapModal";
import BuildActiveModal from "./BuildActiveModal";

const BuildingTable = ({ buildingData }) => {
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

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentData = buildingData?.slice(startIndex, endIndex);
  /// location /////
  const [openMap, setOpenMap] = useState(false);
  const toggleMap = (bool) => setOpenMap(bool);
  //// edit ///
  const [editData, setEditData] = useState("");
  const handleEdit = (vals) => setEditData(vals);
  /// activate ///
  const [openActive, setOpenActive] = useState(false);
  const toggleActive = (boool) => setOpenActive(boool);

  const tableColumns = BuildingCol({
    toggleMap,
    handleEdit,
    toggleActive,
  });
  const CustomPagination = () => {
    const count = Math.ceil((buildingData?.length || 0) / rowsPerPage);

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
        <CardHeader tag="h4">مدیریت ساختمان ها</CardHeader>
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            sortServer
            responsive
            columns={tableColumns}
            sortIcon={<ChevronDown />}
            data={buildingData}
            onSort={handleSort}
            paginationComponent={CustomPagination}
          />
        </div>
      </Card>
      {openMap && <MapModal isOpen={openMap} toggle={toggleMap} />}
      {openActive && (
        <BuildActiveModal
          isOpen={openActive}
          toggle={toggleActive}
          editData={editData}
        />
      )}
    </Fragment>
  );
};

export default BuildingTable;
