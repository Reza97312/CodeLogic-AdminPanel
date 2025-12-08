import { Card, CardHeader } from "reactstrap";
import {
  Modal,
  ModalBody,
  Card as RCard,
  CardBody,
  CardImg,
  ModalHeader,
  Button,
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
  ThumbsUp,
  ThumbsDown,
} from "react-feather";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { GetMyCourseComment } from "../../../core/services/api/get/GetMyCourseComment";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import empty from "../../../assets/images/icons/empty.json";
import { AcceptCm } from "../../../core/services/api/post/Courses/AcceptCm";
import { toast } from "react-toastify";
import { DeleteCourseCm } from "../../../core/services/api/delete/Courses/DeleteCourseCm";

const UserComments = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["GetMyCourseComment", id],
    queryFn: () => GetMyCourseComment({ userId: id, RowsOfPage: 1000 }),
  });

  const comment = data?.comments ?? [];

  const acceptComment = useMutation({
    mutationFn: AcceptCm,
    onSuccess: () => {
      toast.success("کامنت با موفقیت تایید شد");

      queryClient.invalidateQueries(["GetMyCourseComment"]);
    },
    onError: () => {
      toast.error("خطا در تایید کامنت");
    },
  });

  const handleAccept = (row) => {
    if (row.accept) {
      toast.info("این کامنت قبلا تایید شده است");
      return;
    }

    acceptComment.mutate(row.id);
  };

  const deleteComment = useMutation({
    mutationFn: DeleteCourseCm,
    onSuccess: () => {
      toast.success("کامنت با موفقیت حذف شد");

      queryClient.invalidateQueries(["GetMyCourseComment"]);
    },
    onError: () => {
      toast.error("خطا در حذف کامنت");
    },
  });

  const handleDelete = (rowId) => {
    deleteComment.mutate(rowId);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const paginatedData = comment.slice(
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
      width: "13%",
      name: "نام دوره",
      selector: (row) => row.courseTitle,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.courseTitle}</span>
            </div>
          </div>
        );
      },
    },
    {
      name: "عنوان کامنت  ",
      width: "15%",

      selector: (row) => row.title,
      center: true,
    },

    {
      name: "متن کامنت",
      width: "16%",

      selector: (row) => row.describe,
      sortable: true,
      cell: (row) => {
        const text = row.describe || "";
        const shortText = text.length > 10 ? text.slice(0, 15) + "…" : text;

        return (
          <div className="d-flex flex-column w-100">
            <small className="mb-1">{shortText}</small>
          </div>
        );
      },
    },

    {
      name: "وضعیت ",
      width: "11%",

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
      name: "مشاهده",
      width: "9%",

      cell: (row) => (
        <Eye
          size={18}
          className="cursor-pointer"
          onClick={() => handleOpenModal(row)}
        />
      ),
      center: true,
    },
    {
      name: "اقدام",
      width: "36%",

      cell: (row) => (
        <div className="  d-flex justify-content-between align-items-center gap-1">
          <Button
            outline
            color={row.accept ? "" : "success"}
            className="text-nowrap btn-hover-fill"
            style={{ fontSize: "10px" }}
            size="sm"
            onClick={() => handleAccept(row)}
          >
            {row.accept ? "تایید شده" : "تایید کردن"}
          </Button>
          <Button
            outline
            color="danger"
            className="text-nowrap btn-hover-fillr"
            style={{ fontSize: "10px" }}
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            حذف کردن
          </Button>
          <Button
            outline
            color="warning"
            className="text-nowrap btn-hover-fill3"
            style={{ fontSize: "10px" }}
            size="sm"
          >
            رد کردن
          </Button>
        </div>
      ),
      center: true,
    },
  ];

  if (comment.length === 0) {
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
        <h5>هیچ کامنتی یافت نشد</h5>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader tag="h4">کامنت ها </CardHeader>
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
                        src={selectedCourse.pictureAddress}
                        alt={selectedCourse.title}
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
                      <User size={14} style={{ marginInlineEnd: "6px" }} />
                      نویسنده:
                    </h6>
                    <Badge
                      style={{ padding: "8px" }}
                      pill
                      className="bg-light-primary text-primary "
                    >
                      {selectedCourse.author}
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
                          تاریخ ثبت:
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
                        <h6 className="text-secondary fw-bold ">
                          <ThumbsUp
                            size={14}
                            style={{ marginInlineEnd: "6px" }}
                          />
                          تعداد لایک:
                        </h6>
                        <Badge
                          style={{ padding: "10px 12px" }}
                          pill
                          className="bg-light-info text-info mb-1"
                        >
                          {selectedCourse.likeCount}
                        </Badge>
                      </div>

                      <div className="col-6">
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
                          className={`mb-2 ${
                            selectedCourse.accept
                              ? "bg-light-success text-success"
                              : "bg-light-danger text-danger"
                          }`}
                        >
                          {selectedCourse.accept ? "تایید شده" : "تایید نشده"}
                        </Badge>
                        <h6 className="text-secondary fw-bold ">
                          <ThumbsDown
                            size={14}
                            style={{ marginInlineEnd: "6px" }}
                          />
                          تعداد دیسلایک:
                        </h6>
                        <Badge
                          style={{ padding: "10px 12px" }}
                          pill
                          className="bg-light-info text-info mb-1"
                        >
                          {selectedCourse.disslikeCount}
                        </Badge>
                      </div>
                      <div className="col-12">
                        <hr />

                        <h6 className="text-secondary fw-bold mb-2">
                          عنوان کامنت :
                        </h6>
                        <p
                          style={{ borderRadius: "9999px", textAlign: "start" }}
                          className="mt-1 small p-1 bg-light-info  ps-2"
                        >
                          {selectedCourse.title}
                        </p>
                        <h6 className="text-secondary fw-bold mb-0">
                          متن کامنت :
                        </h6>
                        <p
                          style={{ borderRadius: "9999px", textAlign: "start" }}
                          className="mt-1 small p-1 bg-light-info  ps-2"
                        >
                          {selectedCourse.describe}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </RCard>
              </ModalBody>
            </>
          )}
        </Modal>

        {comment.length > 0 && (
          <ReactPaginate
            previousLabel={""}
            nextLabel={""}
            pageCount={Math.ceil(comment.length / rowsPerPage)}
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

export default UserComments;
