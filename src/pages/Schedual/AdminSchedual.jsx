import { Button, Card, CardHeader, Col, Input } from "reactstrap";
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
import GetAdminSchedual from "../../core/services/api/get/GetAdminSchedual";

const AdminSchedual = () => {
  const { data } = useQuery({
    queryKey: ["GetAdminSchedual"],
    queryFn: () => GetAdminSchedual(),
  });

  const adshedual = data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const paginatedData = adshedual.slice(
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

  const PersianNumber = (num) => {
    return num.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  const columns = [
    {
      sortable: true,
      width: "25%",
      name: "ساعت شروع ",
      selector: (row) => row.startTime,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-center align-items-center w-100">
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">
                {" "}
                {PersianNumber(row.startTime)}
              </span>
            </div>
          </div>
        );
      },
      center: true,
    },
    {
      name: "تاریخ شروع  ",
      selector: (row) => row.startDate,
      sortable: true,
      width: "25%",
      cell: (row) => {
        return (
          <div className="d-flex justify-content-center align-items-center w-100 text-center">
            <small className="mb-1 text-truncate fw-bolder ">
              {new Date(row.startDate).toLocaleDateString("fa-IR")}
            </small>
          </div>
        );
      },
      center: true,
    },

    {
      name: "ساعت پایان",
      selector: (row) => row.endTime,
      sortable: true,
      width: "25%",
      cell: (row) => {
        return (
          <div className="d-flex flex-column w-100 text-center">
            <small className="mb-1 fw-bolder">
              {PersianNumber(row.endTime)}
            </small>
          </div>
        );
      },
      center: true,
    },

    {
      name: "وضعیت ",
      selector: (row) => row.AP,
      width: "25%",
      cell: (row) => {
        const isAccept = row.AP === true;

        return (
          <div className="d-flex justify-content-center w-100">
            <span
              style={{ padding: "7px", borderRadius: "9999px" }}
              className={`badge ${isAccept ? "bg-success" : "bg-danger"}`}
            >
              {isAccept ? "تایید شده" : "تایید نشده"}
            </span>
          </div>
        );
      },
      center: true,
    },
    // {
    //   name: "اقدام",
    //   cell: (row) => (
    //     <Eye
    //       size={18}
    //       className="cursor-pointer"
    //       onClick={() => handleOpenModal(row)}
    //     />
    //   ),
    //   center: true,
    // },
  ];
  return (
    <div>
      <Col xl="9">
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h4 tag="h4" className="mb-0">
              بازه زمانی ادمین
            </h4>
            <div className="d-flex justify-content-between gap-2">
              <Input type="select" style={{ width: "150px" }}>
                <option value="all">همه وضعیت‌ها</option>
                <option value="approved">تایید شده</option>
                <option value="rejected">تایید نشده</option>
              </Input>
              <Button color="primary">افزودن بازه زمانی</Button>
            </div>
          </CardHeader>
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
                              {selectedCourse.accept
                                ? "تایید شده"
                                : "تایید نشده"}
                            </Badge>
                          </div>
                          <div className="col-4">
                            <h6 className="text-secondary fw-bold mb-1">
                              <User
                                size={14}
                                style={{ marginInlineEnd: "6px" }}
                              />
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

            {adshedual.length > 0 && (
              <ReactPaginate
                previousLabel={""}
                nextLabel={""}
                pageCount={Math.ceil(adshedual.length / rowsPerPage)}
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
      </Col>
      <Col xl="3"></Col>
    </div>
  );
};

export default AdminSchedual;
