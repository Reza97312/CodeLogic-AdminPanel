import { Button, Card, CardHeader, FormGroup, Input, Label } from "reactstrap";
import {
  Modal,
  ModalBody,
  Card as RCard,
  CardBody,
  CardImg,
  ModalHeader,
  ModalFooter,
  Badge,
} from "reactstrap";
import {
  ChevronDown,
  Eye,
  X,
  Calendar,
  Book,
  Users,
  DollarSign,
  Edit,
  Search,
  File,
  Hash,
  Clipboard,
} from "react-feather";
import Avatar from "@components/avatar";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import Lottie from "lottie-react";
import empty from "../../assets/images/icons/empty.json";
import GetDepartment from "../../core/services/api/get/GetDepartment";
import img5 from "../../assets/images/icons/HTML5Course.png";
import GetBuliding from "../../core/services/api/get/GetBuliding";
import { toast } from "react-toastify";
import AddDepartment from "../../core/services/api/post/AddDepartment";
import UpdateDepartment from "../../core/services/api/put/UpdateDepartment";
import GetDepartmentDetail from "../../core/services/api/get/GetDepartmentDetail";
import GetClassRoom from "../../core/services/api/get/GetClassRoom";
import GetClassRoomDetails from "../../core/services/api/get/GetClassRoomDetails";
import UpdateClassRoom from "../../core/services/api/put/UpdateClassRoom";
import AddClassRoom from "../../core/services/api/post/AddClassRoom";
import infinity from "../../assets/images/icons/Infinity Loader.json";

const BulidSelect = ({ isOpen, toggle, SelectCourse }) => {
  const [searchText, setSearchText] = useState("");

  const { data: coursesData, isLoading } = useQuery({
    queryKey: ["GetBuliding"],
    queryFn: () => GetBuliding(),
  });

  const coursesList = coursesData || [];

  const filteredCourses = useMemo(() => {
    return coursesList.filter((bulid) => {
      const search = bulid.buildingName || "";
      return search.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [coursesList, searchText]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const columns = [
    {
      name: "نام ساختمان",
      selector: (row) => row.buildingName,
      sortable: true,
      grow: 2,
      center: true,
      width: "25%",
    },

    {
      name: "تعداد طبقه ",
      selector: (row) => row.floor,
      sortable: true,
      grow: 2,
      center: true,
      width: "25%",
    },
    {
      name: "وضعیت",
      width: "25%",

      selector: (row) => row.active,
      cell: (row) => (
        <span
          style={{ borderRadius: "9999px", padding: "10px" }}
          className={
            row.active
              ? "badge bg-success-subtle text-success"
              : "badge bg-danger-subtle text-danger"
          }
        >
          {row.active ? "فعال" : "غیرفعال"}
        </span>
      ),
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
            SelectCourse(row);
            toggle();
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
      <ModalHeader toggle={toggle}>ساختمان را انتخاب کنید</ModalHeader>
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
        <div></div>
        <DataTable
          data={paginatedCourses}
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
              <p> ساختمانی یافت نشد</p>
            </div>
          }
          progressPending={isLoading}
          noHeader
        />

        {filteredCourses.length > 0 && (
          <ReactPaginate
            previousLabel={""}
            nextLabel={""}
            pageCount={Math.ceil(filteredCourses.length / rowsPerPage)}
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

const EditModal = ({ isOpen, toggle, currentDep, refetch }) => {
  const [className, setClassName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isBuildSelectOpen, setIsBuildSelectOpen] = useState(false);

  useEffect(() => {
    if (currentDep) {
      setClassName(currentDep.classRoomName);
      setCapacity(currentDep.capacity);

      if (currentDep.building) {
        setSelectedBuilding(currentDep.building);
      } else {
        setSelectedBuilding({
          buildingName: currentDep.buildingName,
          id: currentDep.buildingId,
        });
      }
    }
  }, [currentDep, isOpen]);

  const updateMutation = useMutation({
    mutationFn: UpdateClassRoom,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("کلاس با موفقیت ویرایش شد");
      }
      refetch();
      toggle();
    },
    onError: (err) => {
      toast.error("خطا در ویرایش کلاس");
      console.log(err);
    },
  });

  const handleSubmit = () => {
    if (!className || !capacity || !selectedBuilding) {
      toast.warn("لطفا نام کلاس، ظرفیت و ساختمان را انتخاب کنید");
      return;
    }

    const payload = {
      id: currentDep.id,
      classRoomName: className,
      capacity: parseInt(capacity, 10),
      buildingId: selectedBuilding.id,
    };

    updateMutation.mutate(payload);
  };

  const handleSelectBuilding = (building) => {
    setSelectedBuilding(building);
    setIsBuildSelectOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        centered
        style={{ maxWidth: "480px", width: "90%" }}
      >
        <ModalHeader toggle={toggle} className="border-0 p-2 pb-2">
          ویرایش کلاس
        </ModalHeader>

        <ModalBody style={{ padding: "2rem" }}>
          <RCard className="shadow-none border-0 m-0">
            <FormGroup className="mb-3">
              <Label for="editClassName">نام کلاس:</Label>
              <Input
                type="text"
                id="editClassName"
                placeholder="نام کلاس را وارد کنید..."
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="editCapacity">ظرفیت:</Label>
              <Input
                type="number"
                id="editCapacity"
                placeholder="ظرفیت کلاس را وارد کنید..."
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="editSelectBuilding">انتخاب ساختمان:</Label>
              <Input
                readOnly
                id="editSelectBuilding"
                onClick={() => setIsBuildSelectOpen(true)}
                value={
                  selectedBuilding
                    ? selectedBuilding.buildingName
                    : "ساختمانی انتخاب نشده"
                }
                style={{ cursor: "pointer" }}
              />
            </FormGroup>
          </RCard>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between align-items-center">
          <Button color="secondary" onClick={toggle}>
            انصراف
          </Button>

          <Button
            color="primary"
            onClick={handleSubmit}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "در حال ویرایش..." : "ثبت تغییرات"}
          </Button>
        </ModalFooter>
      </Modal>

      <BulidSelect
        isOpen={isBuildSelectOpen}
        toggle={() => setIsBuildSelectOpen(!isBuildSelectOpen)}
        SelectCourse={handleSelectBuilding}
      />
    </>
  );
};

const DetailModal = ({ isOpen, toggle, classroomid }) => {
  const { data: detailData, isLoading } = useQuery({
    queryKey: ["GetClassRoomDetails", classroomid],
    queryFn: () => GetClassRoomDetails(classroomid),
    enabled: !!classroomid,
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      size="sm"
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggle} className="border-0 pb-2">
        جزئیات کلاس
      </ModalHeader>
      <ModalBody>
        <CardBody className="px-2 mt-2">
          <div className="row g-2 mb-2 small justify-content-around text-center">
            <div className="col-4">
              <h6 className="text-secondary fw-bold mb-1 text-nowrap">
                <Clipboard size={14} style={{ marginInlineEnd: "6px" }} />
                نام کلاس :
              </h6>
              <Badge
                style={{ padding: "10px", fontSize: "13px" }}
                pill
                className="bg-light-info text-info mb-1"
              >
                {detailData?.classRoomName}
              </Badge>
            </div>

            <div className="col-4">
              <h6 className="text-secondary fw-bold mb-1 text-nowrap">
                <Users size={14} style={{ marginInlineEnd: "6px" }} />
                ظرفیت کلاس :
              </h6>
              <Badge
                style={{ padding: "10px", fontSize: "13px" }}
                pill
                className="bg-light-info text-info mb-1"
              >
                {detailData?.capacity} نفر
              </Badge>
            </div>
          </div>
        </CardBody>
      </ModalBody>
    </Modal>
  );
};

const Classes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["GetClassRoom"],
    queryFn: () => GetClassRoom(),
  });

  const classes = data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const paginatedData = classes.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [className, setClassName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isBuildSelectOpen, setIsBuildSelectOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingDep, setEditingDep] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [Classroomid, setClassroomid] = useState(null);

  const queryClient = useQueryClient();

  const handleOpenDetailModal = (id) => {
    setClassroomid(id);
    setDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setClassroomid(null);
  };

  const handleOpenEditModal = (row) => {
    setEditingDep(row);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingDep(null);
  };

  const addMutation = useMutation({
    mutationFn: AddClassRoom,
    onSuccess: () => {
      toast.success("کلاس با موفقیت اضافه شد");
      queryClient.invalidateQueries(["GetClassRoom"]);
      handleCloseModal();
    },
    onError: (err) => {
      toast.error("خطا در ثبت کلاس");
      console.log(err);
    },
  });

  const handleOpenModal = () => {
    setSelectedCourse(true);
    setClassName("");
    setCapacity("");
    setSelectedBuilding(null);
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!className || !capacity || !selectedBuilding) {
      toast.warn("لطفا نام کلاس، ظرفیت و ساختمان را انتخاب کنید");
      return;
    }

    const payload = {
      id: 0,
      classRoomName: className,
      capacity: parseInt(capacity, 10),
      buildingId: selectedBuilding.id,
    };

    addMutation.mutate(payload);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
    setSelectedBuilding(null);
    setClassName("");
    setCapacity("");
  };

  const handleOpenBuildSelectModal = () => {
    setIsBuildSelectOpen(true);
  };

  const handleCloseBuildSelectModal = () => {
    setIsBuildSelectOpen(false);
  };

  const handleSelectBuilding = (building) => {
    setSelectedBuilding(building);
    handleCloseBuildSelectModal();
  };

  const columns = [
    {
      sortable: true,
      width: "12.5%",
      name: "نام کلاس",
      center: true,
      selector: (row) => row.classRoomName,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">
                {row.classRoomName}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      name: " نام ساختمان ",
      width: "12.5%",
      selector: (row) => `${row.building.buildingName}  `,
      center: true,
    },
    {
      name: "طول جغرافیایی ساختمان  ",
      width: "12.5%",
      selector: (row) =>
        row.building.longitude.slice(
          0,
          row.building.longitude.indexOf(".") + 2
        ),
      center: true,
    },
    {
      name: "عرض جغرافیایی ساختمان",
      width: "12.5%",
      selector: (row) =>
        row.building.latitude.slice(0, row.building.latitude.indexOf(".") + 2),
      center: true,
    },
    {
      name: "طبقه ساختمان",
      width: "12.5%",
      selector: (row) => ` طبقه  ${row.building.floor}  `,
      center: true,
    },
    {
      name: "ظرفیت کلاس ",
      width: "12.5%",
      selector: (row) => `${row.capacity} نفر `,
      center: true,
    },
    {
      name: "وضعیت ساختمان",
      width: "12.5%",
      center: true,
      selector: (row) => row.building.active,
      cell: (row) => {
        const isAccept = row.building.active === true;

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
      width: "12.5%",
      cell: (row) => (
        <div>
          <Edit
            style={{ marginLeft: "5px" }}
            size={18}
            onClick={() => handleOpenEditModal(row)}
            className="cursor-pointer"
          />
          <File
            size={18}
            className="cursor-pointer"
            style={{ marginRight: "5px" }}
            onClick={() => handleOpenDetailModal(row.id)}
          />
        </div>
      ),
      center: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="text-center p-5 mt-5 d-flex flex-column justify-content-center align-items-center">
        <Lottie animationData={infinity} />
        <h5>درحال بارگذاری اطلاعات...</h5>
      </div>
    );
  }

  if (classes.length === 0) {
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
        <h5> نتیجه ای یافت نشد</h5>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader tag="h4">
        <div
          style={{ padding: "0 30px" }}
          className="d-flex justify-content-between align-items-center w-100"
        >
          <p> کلاس ها</p>
          <Button onClick={handleOpenModal} color="primary">
            {" "}
            افزودن کلاس{" "}
          </Button>
        </div>
      </CardHeader>
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
                className="border-0 p-2 pb-2"
              >
                اضافه کردن کلاس
              </ModalHeader>

              <ModalBody style={{ padding: "2rem" }}>
                <RCard className="shadow-none border-0 m-0">
                  <FormGroup className="mb-3">
                    <Label for="departmentName">نام کلاس:</Label>
                    <Input
                      type="text"
                      id="departmentName"
                      placeholder="نام کلاس را وارد کنید..."
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <Label for="capacity">ظرفیت کلاس:</Label>
                    <Input
                      type="number"
                      id="capacity"
                      placeholder="ظرفیت کلاس را وارد کنید..."
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="selectBuildingInput">انتخاب ساختمان:</Label>
                    <Input
                      readOnly
                      id="selectBuildingInput"
                      onClick={handleOpenBuildSelectModal}
                      value={
                        selectedBuilding
                          ? selectedBuilding.buildingName
                          : "برای انتخاب کلیک کنید..."
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </FormGroup>
                </RCard>
              </ModalBody>
              <ModalFooter className="d-flex justify-content-between align-items-center">
                <Button color="secondary" onClick={handleCloseModal}>
                  انصراف
                </Button>

                <Button
                  color="primary"
                  onClick={handleSubmit}
                  disabled={addMutation.isPending}
                >
                  {addMutation.isPending ? "در حال ثبت..." : "تایید اطلاعات"}
                </Button>
              </ModalFooter>
            </>
          )}
        </Modal>

        <BulidSelect
          isOpen={isBuildSelectOpen}
          toggle={handleCloseBuildSelectModal}
          SelectCourse={handleSelectBuilding}
        />

        <EditModal
          isOpen={editModalOpen}
          toggle={handleCloseEditModal}
          currentDep={editingDep}
          refetch={() => queryClient.invalidateQueries(["GetDepartment"])}
        />

        <DetailModal
          isOpen={detailModalOpen}
          toggle={handleCloseDetailModal}
          classroomid={Classroomid}
        />

        {classes.length > 0 && (
          <ReactPaginate
            previousLabel={""}
            nextLabel={""}
            pageCount={Math.ceil(classes.length / rowsPerPage)}
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

export default Classes;
