import { Fragment, useState } from "react";
import loading from "../../../assets/images/A/loading.gif";

import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { ChevronDown } from "react-feather";

import { selectThemeColors } from "@utils";

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
import { CommentsReplyCol } from "./CommentsReplyCol";
import DeleteCmModal from "../../Courses/Comments/DeleteCmModal";
import AcceptCmModal from "../../Courses/Comments/AcceptCmModal";

const CommentsReplyTable = ({ ReplyData }) => {
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(null);
  const toggleEditModal = (value) => setOpenEditModal(value);

  const toggleDeleteModal = (val) => setOpenDeleteModal(val);
  const handleCmId = (value) => setCommentId(value);
  const tableColumns = CommentsReplyCol({
    toggleDeleteModal,
    handleCmId,
    toggleEditModal,
  });

  return (
    <Fragment>
      <Card>
        <div className="react-dataTable">
          <DataTable
            noHeader
            responsive
            columns={tableColumns}
            sortIcon={<ChevronDown />}
            data={ReplyData}
          />
        </div>
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

export default CommentsReplyTable;
