// ** React Imports
import { Fragment, useState } from "react";
import loading from "../../assets/images/A/loading.gif";
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
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReservedCourseCol } from "./ReservedCoursesCol";
import { GetCourseStatus } from "../../core/services/api/get/Courses/GetCourseStatus";

const StatusTable = () => {
  const { data: statuseData = [], isPending } = useQuery({
    queryKey: ["ALLSTAYUSES"],
    queryFn: () => GetCourseStatus(),
  });
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

  const tableColumns = ReservedCourseCol({});
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentData = statuseData.slice(startIndex, endIndex);

  const CustomPagination = () => {
    const count = Math.ceil((statuseData.length || 0) / rowsPerPage);

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
        <CardHeader tag="h4">مدیریت وضعیت ها</CardHeader>
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
              data={statuseData}
              paginationComponent={CustomPagination}
            />
          </div>
        )}
      </Card>
    </Fragment>
  );
};

export default StatusTable;
