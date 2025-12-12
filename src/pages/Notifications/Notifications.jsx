import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
} from "reactstrap";
import { Search } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import empty from "../../assets/images/icons/empty.json";
import Lottie from "lottie-react";
import infinity from "../../assets/images/icons/Infinity Loader.json";
import firstload from "../../assets/images/icons/Searching.json";
import img5 from "../../assets/images/icons/courseteacher.png";
import GetAllUser from "../../core/services/api/get/GetAllUser";
import notiffon from "../../assets/images/icons/Notifications.json";
import { GetAllNotifications } from "../../core/services/api/get/GetAllNotifications";
import SendNotifications from "../../core/services/api/post/SendNotifications";

const CourseSelect = ({ isOpen, toggle, SelectUser }) => {
  const [searchText, setSearchText] = useState("");

  const { data: UserData, isLoading } = useQuery({
    queryKey: ["GetAllUser"],
    queryFn: () => GetAllUser({ RowsOfPage: 1000 }),
  });

  const UserList = UserData?.listUser || [];

  const filteredUsers = useMemo(() => {
    return UserList.filter((user) => {
      const name = (user.fName || "") + " " + (user.lName || "");
      return name.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [UserList, searchText]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const columns = [
    {
      name: "تصویر",
      center: true,
      width: "15%",
      cell: (row) => (
        <div
          style={{
            width: "40px",
            height: "40px",
            overflow: "hidden",
            borderRadius: "9999px",
          }}
        >
          {row.currentPictureAddress ? (
            <img
              src={row.currentPictureAddress}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={img5}
            />
          )}
        </div>
      ),
      center: true,
    },
    {
      name: "نام کاربر",
      sortable: true,
      grow: 2,
      center: true,
      width: "25%",
      cell: (row) => {
        const first = row.fName || "";
        const last = row.lName || "";
        return (
          <span className="fw-bold">
            {first} {last}
          </span>
        );
      },
    },
    {
      name: "ایمیل کاربر",
      width: "35%",
      selector: (row) => row.gmail,
      cell: (row) => <span>{row.gmail}</span>,
      center: true,
    },
    {
      name: "عملیات",
      width: "25%",
      cell: (row) => (
        <Button
          color="primary"
          size="sm"
          onClick={() => {
            SelectUser(row);
          }}
        >
          انتخاب
        </Button>
      ),
      center: true,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      size="lg"
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggle}>کاربر را انتخاب کنید</ModalHeader>
      <ModalBody>
        <div className="mb-3 position-relative">
          <Input
            placeholder="جستجو..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ paddingLeft: "30px" }}
          />
          <Search
            size={15}
            style={{
              position: "absolute",
              left: "10px",
              top: "12px",
              color: "#aaa",
            }}
          />
        </div>
        <DataTable
          data={paginatedUsers}
          columns={columns}
          className="react-dataTable"
          noDataComponent={
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
              <Lottie
                style={{
                  width: "200px",
                  height: "200px",
                  marginBottom: "20px",
                }}
                animationData={empty}
              />
              <p> کاربری یافت نشد</p>
            </div>
          }
          progressPending={isLoading}
          noHeader
        />
        {filteredUsers.length > 0 && (
          <ReactPaginate
            previousLabel={""}
            nextLabel={""}
            pageCount={Math.ceil(filteredUsers.length / rowsPerPage)}
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
              "pagination react-paginate justify-content-center my-2 pe-1"
            }
          />
        )}
      </ModalBody>
    </Modal>
  );
};

const AddNotificationModal = ({
  isOpen,
  toggle,
  courseSelectOpen,
  selectedUser,
  setSelectedUser,
  sendNotificationMutation,
}) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMessage("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!selectedUser) {
      toast.warn("لطفا کاربر مورد نظر را انتخاب کنید");
      return;
    }
    if (!message.trim()) {
      toast.warn("لطفا متن پیام را وارد کنید");
      return;
    }

    const payload = {
      message: message.trim(),
      userId: selectedUser.id,
    };

    sendNotificationMutation.mutate(payload);
  };

  const handleUserSelectClick = () => {
    courseSelectOpen();
  };

  const UserName = () => {
    if (selectedUser) {
      return `${selectedUser.fName} ${selectedUser.lName}`.trim();
    }
    return "";
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered"
      onClosed={() => setSelectedUser(null)}
    >
      <ModalHeader toggle={toggle}>ارسال اعلان </ModalHeader>
      <ModalBody>
        <div className="mb-4">
          <label className="form-label" htmlFor="user-select">
            انتخاب کاربر
          </label>
          <div className="position-relative">
            <Input
              id="user-select"
              placeholder="برای انتخاب کاربر کلیک کنید"
              value={UserName()}
              onClick={handleUserSelectClick}
              readOnly
              className="cursor-pointer"
            />
          </div>
          {selectedUser && (
            <small className="text-success mt-1 d-block">
              کاربر انتخاب شده: {UserName()}
            </small>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="notification-message">
            پیام
          </label>
          <Input
            type="textarea"
            id="notification-message"
            rows="3"
            placeholder="متن پیام خود را بنویسید..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              minHeight: "80px",
              maxHeight: "200px",
              resize: "vertical",
            }}
          />
        </div>

        <div className="d-flex justify-content-end">
          <Button color="secondary" outline onClick={toggle}>
            انصراف
          </Button>
          <Button
            className="ms-2"
            color="primary"
            onClick={handleSubmit}
            disabled={sendNotificationMutation.isPending}
          >
            {sendNotificationMutation.isPending ? "در حال ارسال..." : "  ارسال"}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

const Notifications = () => {
  const [courseSelect, setCourseSelect] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const toggleCourseSelect = () => setCourseSelect((prev) => !prev);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setCourseSelect(false);
  };

  const toggleAddModal = () => {
    setAddModalOpen((prev) => !prev);
  };

  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GetAllNotifications", selectedUser?.id],
    queryFn: () => GetAllNotifications(selectedUser.id),
    enabled: !!selectedUser?.id,
  });

  const sendNotificationMutation = useMutation({
    mutationFn: (data) => SendNotifications(data),
    onSuccess: () => {
      toast.success("اعلان با موفقیت ارسال شد");
      setAddModalOpen(false);
      setSelectedUser(null);
    },
    onError: () => {
      toast.error("مشکلی در ارسال اعلان رخ داد");
    },
  });

  const adshedual = data ?? [];
  const paginatedData = adshedual.slice(0, 7);

  if (isLoading && selectedUser) {
    return (
      <div
        style={{ marginTop: "80px" }}
        className="text-center d-flex flex-column justify-content-center align-items-center"
      >
        <Lottie
          style={{ width: "300px", height: "300px" }}
          animationData={infinity}
        />
        <p>لطفا منتظر بمانید...</p>
      </div>
    );
  }

  return (
    <div className="row">
      <Col xl="8">
        <Card className="h-100">
          <div className="react-dataTable user-view-account-projects">
            <div
              style={{ height: "300px" }}
              className="d-flex flex-column align-items-center justify-content-center text-center"
            >
              <Lottie
                style={{
                  width: "300px",
                  height: "300px",
                  marginBottom: "10px",
                  marginTop: "200px",
                }}
                animationData={firstload}
              />
              <Button className="mb-3" color="primary" onClick={toggleAddModal}>
                {" "}
                ارسال اعلان
              </Button>
              <h5 className="text-secondary">
                لطفا برای ارسال اعلان ابتدا روی گزینه ارسال اعلان کلیک کرده و
                سپس کاربر مورد نظر را انتخاب کنید
              </h5>
            </div>
          </div>
        </Card>
      </Col>
      <Col xl="4">
        <Card className=" text-center h-100">
          <CardBody className="p-0  h-100">
            <Lottie animationData={notiffon} />
          </CardBody>
        </Card>
      </Col>
      <CourseSelect
        isOpen={courseSelect}
        toggle={toggleCourseSelect}
        SelectUser={handleUserSelect}
      />
      <AddNotificationModal
        isOpen={addModalOpen}
        toggle={toggleAddModal}
        courseSelectOpen={toggleCourseSelect}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        sendNotificationMutation={sendNotificationMutation}
      />
    </div>
  );
};

export default Notifications;
