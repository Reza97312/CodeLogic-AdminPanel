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
} from "react-feather";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import GetMyCourses from "../../../core/services/api/get/GetMyCourses";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const UserMyCourses = () => {
  const params = {
    PageNumber: 1,
    RowsOfPage: 10,
    SortingCol: "DESC",
    SortType: "LastUpdate",
  };

  const { data } = useQuery({
    queryKey: ["GetMyCourses", params],
    queryFn: () => GetMyCourses(params),
  });

  const courses = data?.listOfMyCourses ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const paginatedData = courses.slice(
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
      selector: (row) => row.courseTitle,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              <Avatar
                className="me-1"
                img={row.tumbImageAddress}
                alt={row.courseTitle}
                imgWidth="32"
              />
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.courseTitle}</span>
              <small className="text-muted">{row.fullName}</small>
            </div>
          </div>
        );
      },
    },
    {
      name: "توضیحات دوره",
      selector: (row) => row.desc,
      center: true,
    },

    {
      name: "آخرین بروزرسانی",
      selector: (row) => row.lastUpdate,
      sortable: true,
      cell: (row) => {
        return (
          <div className="d-flex flex-column w-100">
            <small className="mb-1">
              {new Date(row.lastUpdate).toLocaleDateString("fa-IR")}
            </small>
          </div>
        );
      },
    },
    {
      name: "قیمت دوره",
      selector: (row) => row.cost,
      cell: (row) => <span>{row.cost.toLocaleString("fa-IR")} تومان</span>,
    },

    {
      name: "وضعیت پرداخت",
      selector: (row) => row.paymentStatus,
      cell: (row) => {
        const isPaid = row.paymentStatus === "پرداخت شده";

        return (
          <span
            style={{ padding: "7px", borderRadius: "9999px" }}
            className={`badge  ${isPaid ? "bg-success" : "bg-danger"}`}
          >
            {row.paymentStatus}
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
                        src={selectedCourse.course.imageAddress}
                        alt={selectedCourse.course.title}
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
                      {selectedCourse.course.title}
                    </Badge>
                  </div>

                  <CardBody className="px-2">
                    <div className="row g-2 mb-2 small justify-content-between text-center">
                      <div className="col-6">
                        <h6 className="text-secondary fw-bold mb-1">
                          <DollarSign
                            size={14}
                            style={{ marginInlineEnd: "3px" }}
                          />
                          قیمت:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-1 "
                        >
                          {selectedCourse.course.cost.toLocaleString("fa-IR")}{" "}
                          تومان
                        </Badge>

                        <h6 className="text-secondary fw-bold mb-1">
                          <Calendar
                            size={14}
                            style={{ marginInlineEnd: "6px" }}
                          />
                          تاریخ شروع:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-1 "
                        >
                          {new Date(
                            selectedCourse.course.startTime
                          ).toLocaleDateString("fa-IR")}
                        </Badge>
                      </div>

                      <div className="col-6">
                        <h6 className="text-secondary fw-bold mb-1">
                          <Users size={14} style={{ marginInlineEnd: "6px" }} />
                          ظرفیت:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-1 "
                        >
                          {selectedCourse.course.capacity} نفر
                        </Badge>

                        <h6 className="text-secondary fw-bold mb-1">
                          <Clock size={14} style={{ marginInlineEnd: "6px" }} />
                          تاریخ پایان:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-1 "
                        >
                          {new Date(
                            selectedCourse.course.endTime
                          ).toLocaleDateString("fa-IR")}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-2 small text-center">
                      <h6 className="text-secondary fw-bold mb-1">
                        <RefreshCcw
                          style={{ marginInlineEnd: "6px" }}
                          size={14}
                        />
                        آخرین بروزرسانی:
                      </h6>
                      <Badge
                        style={{ padding: "8px" }}
                        pill
                        className="bg-light-info text-info mb-1 "
                      >
                        {new Date(
                          selectedCourse.course.lastUpdate
                        ).toLocaleDateString("fa-IR")}
                      </Badge>
                    </div>

                    <hr className="my-2" />

                    <h6 className="text-secondary fw-bold mb-0">خلاصه دوره:</h6>
                    <p
                      style={{ borderRadius: "9999px" }}
                      className="mt-1 small p-1 bg-light-info  ps-2"
                    >
                      {selectedCourse.course.miniDescribe}
                    </p>
                  </CardBody>
                </RCard>
              </ModalBody>
            </>
          )}
        </Modal>

        {courses.length > 0 && (
          <ReactPaginate
            previousLabel={""}
            nextLabel={""}
            pageCount={Math.ceil(courses.length / rowsPerPage)}
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

export default UserMyCourses;
