import { Card, CardHeader } from "reactstrap";
import {
  Modal,
  ModalBody,
  Card as RCard,
  CardBody,
  CardImg,
  ModalHeader,
  Badge,
} from "reactstrap";
import {
  ChevronDown,
  Eye,
  X,
  DollarSign,
  Users,
  Calendar,
  Clock,
  RefreshCcw,
  User,
  Activity,
} from "react-feather";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { GetMyReservedCourse } from "../../../core/services/api/get/GetMyReservedCourse";

const UserReservedCourses = () => {
  const { data } = useQuery({
    queryKey: ["GetMyReservedCourse"],
    queryFn: () => GetMyReservedCourse(),
  });

  const rescourses = data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const paginatedData = rescourses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpenModal = (row) => {
    setSelectedCourse(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const columns = [
    {
      sortable: true,
      minWidth: "180px",
      name: "نام دوره",
      selector: (row) => row.courseName,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              <Avatar
                className="me-1"
                img={row.image}
                alt={row.courseName}
                imgWidth="32"
              />
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.courseName}</span>
            </div>
          </div>
        );
      },
    },
    {
      name: "نام استاد ",
      selector: (row) => row.teacher,
      center: true,
    },

    {
      name: "تاریخ ساخت دوره ",
      selector: (row) => row.insertDate,
      sortable: true,
      cell: (row) => {
        return (
          <div className="d-flex flex-column w-100">
            <small className="mb-1">
              {new Date(row.insertDate).toLocaleDateString("fa-IR")}
            </small>
          </div>
        );
      },
    },

    {
      name: "وضعیت دوره",
      selector: (row) => row.accept,
      cell: (row) => {
        const isAccept = row.accept === true;

        return (
          <span
            style={{ padding: "7px", borderRadius: "9999px" }}
            className={`badge  ${isAccept ? "bg-success" : "bg-danger"}`}
          >
            {isAccept ? "تایید شده" : "تایید نشده"}
          </span>
        );
      },
    },
    {
      name: "اقدام",
      cell: (row) => (
        <Eye
          size={18}
          className="cursor-pointer"
          onClick={() => handleOpenModal(row)}
        />
      ),
      center: true,
    },
  ];

  return (
    <Card>
      <CardHeader tag="h4">دوره های تایید شده</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive={false}
          columns={columns}
          data={paginatedData}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />

        <Modal
          isOpen={modalOpen}
          toggle={handleCloseModal}
          centered
          style={{
            maxWidth: "480px",
            width: "90%",
          }}
        >
          {selectedCourse && (
            <>
              <ModalHeader
                toggle={handleCloseModal}
                className="border-0 p-2 pb-0"
                close={
                  <X
                    size={16}
                    onClick={handleCloseModal}
                    className="cursor-pointer"
                  />
                }
              />

              <ModalBody style={{ padding: "1rem" }}>
                <RCard className="shadow-none border-0 m-0">
                  <div className="text-center mb-2">
                    <div
                      style={{
                        width: "80%",
                        borderRadius: "8px",
                        overflow: "hidden",
                        margin: "0 auto",
                      }}
                    >
                      <CardImg
                        src={selectedCourse.image}
                        alt={selectedCourse.courseName}
                        style={{
                          width: "100%",
                          height: "140px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-center ">
                    <Badge
                      color="light-primary"
                      pill
                      className="fw-bolder p-1 px-2 text-truncate"
                      style={{ maxWidth: "80%" }}
                    >
                      {selectedCourse.courseName}
                    </Badge>
                  </div>

                  <CardBody className="px-2 mt-2">
                    <div className="row g-2 mb-2 small justify-content-between text-center">
                      <div className="col-4">
                        <h6 className="text-secondary fw-bold mb-1">
                          <Calendar
                            size={14}
                            style={{ marginInlineEnd: "6px" }}
                          />
                          تاریخ ثبت:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-1"
                        >
                          {new Date(
                            selectedCourse.insertDate
                          ).toLocaleDateString("fa-IR")}
                        </Badge>
                      </div>

                      <div className="col-4">
                        <h6 className="text-secondary fw-bold mb-1">
                          <Activity
                            size={14}
                            style={{ marginInlineEnd: "6px" }}
                          />
                          وضعیت:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className={`mb-1 ${
                            selectedCourse.accept
                              ? "bg-light-success text-success"
                              : "bg-light-danger text-danger"
                          }`}
                        >
                          {selectedCourse.accept ? "تایید شده" : "تایید نشده"}
                        </Badge>
                      </div>
                      <div className="col-4">
                        <h6 className="text-secondary fw-bold mb-1">
                          <User size={14} style={{ marginInlineEnd: "6px" }} />
                          استاد:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-1"
                        >
                          {selectedCourse.teacher}
                        </Badge>
                      </div>
                    </div>
                  </CardBody>
                </RCard>
              </ModalBody>
            </>
          )}
        </Modal>

        {rescourses.length > 0 && (
          <ReactPaginate
            previousLabel={""}
            nextLabel={""}
            pageCount={Math.ceil(rescourses.length / rowsPerPage)}
            activeClassName="active"
            forcePage={currentPage - 1}
            onPageChange={(page) => handlePagination(page)}
            pageClassName={"page-item"}
            nextLinkClassName={"page-link"}
            nextClassName={"page-item next"}
            previousClassName={"page-item prev"}
            previousLinkClassName={"page-link"}
            pageLinkClassName={"page-link"}
            containerClassName={
              "pagination react-paginate justify-content-end my-2 pe-1"
            }
          />
        )}
      </div>
    </Card>
  );
};

export default UserReservedCourses;
