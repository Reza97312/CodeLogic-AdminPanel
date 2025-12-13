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
import getAdminNewsComments from "../../../core/services/api/get/News/getAdminNewsComments";
import { NewsCommentsCol } from "./NewsCommentsCol";
import DeleteCmModal from "../../Courses/Comments/DeleteCmModal.jsx";
const NewsCommentsTable = ({ id }) => {
  const { data: cmData = [], isPending } = useQuery({
    queryKey: ["GETNEWSCOMMENT"],
    queryFn: () => getAdminNewsComments(id),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sort, setSort] = useState("DESC");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(null);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = cmData.slice(startIndex, endIndex);

  const toggleEditModal = (value) => setOpenEditModal(value);

  const toggleDeleteModal = (val) => setOpenDeleteModal(val);
  const handleCmId = (value) => setCommentId(value);
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

  const tableColumns = NewsCommentsCol({
    handleCmId,
    toggleEditModal,
    toggleDeleteModal,
    handleOpenModal: () => {},
  });

  const CustomPagination = () => {
    const count = Math.ceil((cmData?.length || 0) / rowsPerPage);

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
              pagination
              responsive
              columns={tableColumns}
              sortIcon={<ChevronDown />}
              data={currentData}
              paginationComponent={CustomPagination}
            />
          </div>
        )}
      </Card>
      {OpenDeleteModal && (
        <DeleteCmModal
          isOpen={OpenDeleteModal}
          toggleDeleteModal={toggleDeleteModal}
          commentId={commentId}
        />
      )}
    </Fragment>
  );
};

export default NewsCommentsTable;
