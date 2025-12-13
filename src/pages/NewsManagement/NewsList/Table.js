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
import getNews from "../../../core/services/api/get/News/getNews.js";
import { NewsCol } from "./columns.js";
import ActivateNewsModal from "../../../components/news/ActivateNews/ActivateNewsModal.jsx";

const NewsTable = ({ catId, sortType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sort, setSort] = useState("DESC");
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [query] = useDebounce(searchTerm, 700);

  const { data: NewsData = {}, isPending } = useQuery({
    queryKey: ["ALLNEWS", currentPage, query, rowsPerPage, sortType, catId],
    queryFn: () =>
      getNews({
        RowsOfPage: rowsPerPage,
        PageNumber: currentPage,
        Query: query,
        NewsCategoryId: catId,
        SortingCol: sortType,
      }),
  });
  const AllData = NewsData?.news || [];

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
    window.scrollTo(0, 0);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };
  const [openActiveModal, setOpenActiveModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const toggleActive = (bool) => setOpenActiveModal(bool);
  const handleEdit = (vals) => setEditData(vals);
  const tableColumns = NewsCol({
    toggleActive,
    handleEdit,
  });

  const CustomHeader = ({
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
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="80">80</option>
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
                placeholder=" جستجو کنید..."
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  const CustomPagination = () => {
    const count = Math.ceil((NewsData?.totalCount || 0) / rowsPerPage);

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
              data={AllData}
              paginationComponent={CustomPagination}
              subHeaderComponent={
                <CustomHeader
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
      {openActiveModal && (
        <ActivateNewsModal
          isOpen={openActiveModal}
          toggleActiveModal={toggleActive}
          activeData={editData}
        />
      )}
    </Fragment>
  );
};

export default NewsTable;
