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
  Calendar,
  User,
  Activity,
  ThumbsUp,
  ThumbsDown,
  Book,
  Users,
  DollarSign,
} from "react-feather";
import Avatar from "@components/avatar";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { GetUserPayment } from "../../../core/services/api/get/GetUserPayment";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import empty from "../../../assets/images/icons/empty.json";

const UserPayments = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["GetUserPayment", id],
    queryFn: () => GetUserPayment({ StudentId: id }),
  });

  const payment = data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const paginatedData = payment.slice(
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

      name: "نام گروه",
      selector: (row) => row.groupName,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              <Avatar
                className="me-1"
                img={row.course.tumbImageAddress}
                alt={row.groupName}
                imgWidth="32"
              />
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.groupName}</span>
            </div>
          </div>
        );
      },
    },
    {
      name: "مبلغ پرداخت شده",

      selector: (row) => `${row.paid} تومان `,
      center: true,
    },

    {
      name: "تاریخ پرداخت",

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
      name: "مشاهده",

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

  if (payment.length === 0) {
    return (
      <div className="text-center d-flex flex-column justify-content-center align-items-center ">
        <Lottie
          style={{
            width: "200px",
            height: "200px",
            marginBottom: "30px",
            marginTop: "100px",
          }}
          animationData={empty}
        />
        <h5>هیچ دوره پرداخت شده ای یافت نشد</h5>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader tag="h4"> پرداختی ها </CardHeader>
      <div className="react-dataTable user-view-account-projects ">
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
                        style={{
                          width: "25%",
                          height: "90px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-center  ">
                    <h6 className="text-secondary fw-bold mb-1">
                      <Book size={14} style={{ marginInlineEnd: "6px" }} />
                      نام دوره:
                    </h6>
                    <Badge
                      style={{ padding: "8px" }}
                      pill
                      className="bg-light-primary text-primary "
                    >
                      {selectedCourse.course.title}
                    </Badge>
                  </div>

                  <CardBody className="px-2 ">
                    <div className="row g-2  small justify-content-between text-center">
                      <div className="col-6">
                        <h6 className="text-secondary fw-bold mb-1">
                          <Calendar
                            size={14}
                            style={{ marginInlineEnd: "6px" }}
                          />
                          تاریخ پرداخت:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-2"
                        >
                          {new Date(
                            selectedCourse.insertDate
                          ).toLocaleDateString("fa-IR")}
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
                          className="bg-light-info text-info mb-2"
                        >
                          {new Date(
                            selectedCourse.course.startTime
                          ).toLocaleDateString("fa-IR")}
                        </Badge>
                        <h6 className="text-secondary fw-bold mb-1">
                          <DollarSign
                            size={14}
                            style={{ marginInlineEnd: "6px" }}
                          />
                          قیمت دوره:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-2"
                        >
                          {selectedCourse.course.cost} تومان
                        </Badge>
                      </div>

                      <div className="col-6">
                        <h6 className="text-secondary fw-bold mb-1">
                          <Calendar
                            size={14}
                            style={{ marginInlineEnd: "6px" }}
                          />
                          آخرین بروزرسانی:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-2"
                        >
                          {new Date(
                            selectedCourse.course.lastUpdate
                          ).toLocaleDateString("fa-IR")}
                        </Badge>
                        <h6 className="text-secondary fw-bold mb-1">
                          <Calendar
                            size={14}
                            style={{ marginInlineEnd: "6px" }}
                          />
                          تاریخ پایان:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-2"
                        >
                          {new Date(
                            selectedCourse.course.endTime
                          ).toLocaleDateString("fa-IR")}
                        </Badge>
                        <h6 className="text-secondary fw-bold mb-1">
                          <Users size={14} style={{ marginInlineEnd: "6px" }} />
                          ظرفیت دوره:
                        </h6>
                        <Badge
                          style={{ padding: "8px" }}
                          pill
                          className="bg-light-info text-info mb-2"
                        >
                          {selectedCourse.course.capacity} نفر
                        </Badge>
                      </div>

                      <div className="col-12">
                        <hr />

                        <h6 className="text-secondary fw-bold mb-0">
                          توضیحات دوره:
                        </h6>
                        <p
                          style={{ borderRadius: "9999px", textAlign: "start" }}
                          className="mt-1 small p-1 bg-light-info  ps-2"
                        >
                          {selectedCourse.course.describe}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </RCard>
              </ModalBody>
            </>
          )}
        </Modal>

        {payment.length > 0 && (
          <ReactPaginate
            previousLabel={""}
            nextLabel={""}
            pageCount={Math.ceil(payment.length / rowsPerPage)}
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

export default UserPayments;
