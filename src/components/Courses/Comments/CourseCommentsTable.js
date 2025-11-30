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
import { CourseCommentsCol } from "./CourseCommentsCol";
import { GetCourseComments } from "../../../core/services/api/get/Courses/GetCourseComments";
import DeleteCmModal from "./DeleteCmModal";
import AcceptCmModal from "./AcceptCmModal";
// import SidebarCreateGroup from "./CreateGroup";
// // import { CourseUsersCol } from "./UsersColumns";
// import { GetCourseGroups } from "../../../core/services/api/get/Courses/GetCourseGroups";

const CourseCommentsTable = ({ id }) => {
  const { data: cmData, isPending } = useQuery({
    queryKey: ["GETCOURSECOMMENT"],
    queryFn: () => GetCourseComments(id),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sort, setSort] = useState("DESC");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(null);
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

  const tableColumns = CourseCommentsCol({
    handleCmId,
    toggleEditModal,
    toggleDeleteModal,
    handleOpenModal: () => {},
  });

  const CustomPagination = () => {
    const count = Math.ceil((cmData?.comments.length || 0) / rowsPerPage);

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
              paginationServer
              sortServer
              responsive
              columns={tableColumns}
              sortIcon={<ChevronDown />}
              data={cmData?.comments}
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
      {openEditModal && (
        <AcceptCmModal
          isOpen={openEditModal}
          toggleEditModal={toggleEditModal}
          commentId={commentId}
        />
      )}
    </Fragment>
  );
};

export default CourseCommentsTable;
