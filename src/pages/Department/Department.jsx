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
  const [depName, setDepName] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isBuildSelectOpen, setIsBuildSelectOpen] = useState(false);

  useEffect(() => {
    if (currentDep) {
      setDepName(currentDep.depName || "");

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
    mutationFn: UpdateDepartment,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("دپارتمان با موفقیت ویرایش شد");
      }
      refetch();
      toggle();
    },
    onError: (err) => {
      toast.error("خطا در ویرایش دپارتمان");
      console.log(err);
    },
  });

  const handleSubmit = () => {
    if (!depName || !selectedBuilding) {
      toast.warn("لطفا نام دپارتمان و ساختمان را انتخاب کنید");
      return;
    }

    const payload = {
      id: currentDep.id,
      depName: depName,
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
          ویرایش دپارتمان
        </ModalHeader>

        <ModalBody style={{ padding: "2rem" }}>
          <RCard className="shadow-none border-0 m-0">
            <FormGroup className="mb-3">
              <Label for="editDepartmentName">نام دپارتمان:</Label>
              <Input
                type="text"
                id="editDepartmentName"
                placeholder="نام دپارتمان را وارد کنید..."
                value={depName}
                onChange={(e) => setDepName(e.target.value)}
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

const DetailModal = ({ isOpen, toggle, departmentId }) => {
  const { data: detailData, isLoading } = useQuery({
    queryKey: ["GetDepartmentDetail", departmentId],
    queryFn: () => GetDepartmentDetail(departmentId),
    enabled: !!departmentId,
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      size="sm"
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggle} className="border-0 pb-2">
        جزئیات دپارتمان
      </ModalHeader>
      <ModalBody>
        <CardBody className="px-2 mt-2">
          <div className="row g-2 mb-2 small justify-content-around text-center">
            <div className="col-4">
              <h6 className="text-secondary fw-bold mb-1 text-nowrap">
                <Clipboard size={14} style={{ marginInlineEnd: "6px" }} />
                نام دپارتمان :
              </h6>
              <Badge
                style={{ padding: "10px", fontSize: "13px" }}
                pill
                className="bg-light-info text-info mb-1"
              >
                {detailData?.name}
              </Badge>
            </div>

            <div className="col-4">
              <h6 className="text-secondary fw-bold mb-1 text-nowrap">
                <Hash size={14} style={{ marginInlineEnd: "6px" }} />
                شناسه دپارتمان :
              </h6>
              <Badge
                style={{ padding: "10px", fontSize: "13px" }}
                pill
                className="bg-light-info text-info mb-1"
              >
                {detailData?.id}#
              </Badge>
            </div>
          </div>
        </CardBody>
      </ModalBody>
    </Modal>
  );
};

const Department = () => {
  const { data } = useQuery({
    queryKey: ["GetDepartment"],
    queryFn: () => GetDepartment(),
  });

  const department = data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const paginatedData = department.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [depName, setDepName] = useState("");
  const [isBuildSelectOpen, setIsBuildSelectOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingDep, setEditingDep] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [DepartmentId, setDepartmentId] = useState(null);

  const queryClient = useQueryClient();

  const handleOpenDetailModal = (id) => {
    setDepartmentId(id);
    setDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setDepartmentId(null);
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
    mutationFn: AddDepartment,
    onSuccess: () => {
      toast.success("دپارتمان با موفقیت اضافه شد");
      queryClient.invalidateQueries(["GetDepartment"]);
      handleCloseModal();
    },
    onError: (err) => {
      toast.error("خطا در ثبت دپارتمان");
      console.log(err);
    },
  });

  const handleOpenModal = () => {
    setSelectedCourse(true);
    setDepName("");
    setSelectedBuilding(null);
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!depName || !selectedBuilding) {
      toast.warn("لطفا نام دپارتمان و ساختمان را انتخاب کنید");
      return;
    }

    const payload = {
      depName: depName,
      buildingId: selectedBuilding.id,
      id: 0,
    };

    addMutation.mutate(payload);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
    setSelectedBuilding(null);
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
      width: "14.2%",
      name: "نام دپارتمان",
      center: true,
      selector: (row) => row.depName,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.depName}</span>
            </div>
          </div>
        );
      },
    },
    {
      name: " نام ساختمان ",
      width: "14.2%",
      selector: (row) => `${row.buildingName}  `,
      center: true,
    },
    {
      name: "طول جغرافیایی ساختمان  ",
      width: "14.2%",
      selector: (row) =>
        row.building.longitude.slice(
          0,
          row.building.longitude.indexOf(".") + 2
        ),
      center: true,
    },
    {
      name: "عرض جغرافیایی ساختمان",
      width: "14.2%",
      selector: (row) =>
        row.building.latitude.slice(0, row.building.latitude.indexOf(".") + 2),
      center: true,
    },
    {
      name: "طبقه ساختمان",
      width: "14.2%",
      selector: (row) => `${row.building.floor}  `,
      center: true,
    },
    {
      name: "وضعیت ساختمان",
      width: "14.2%",
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
      width: "14.2%",
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

  if (department.length === 0) {
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
      <CardHeader tag="h4">
        <div
          style={{ padding: "0 30px" }}
          className="d-flex justify-content-between align-items-center w-100"
        >
          <p> دپارتمان ها</p>
          <Button onClick={handleOpenModal} color="primary">
            {" "}
            افزودن دپارتمان{" "}
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
                اضافه کردن دپارتمان
              </ModalHeader>

              <ModalBody style={{ padding: "2rem" }}>
                <RCard className="shadow-none border-0 m-0">
                  <FormGroup className="mb-3">
                    <Label for="departmentName">نام دپارتمان:</Label>
                    <Input
                      type="text"
                      id="departmentName"
                      placeholder="نام دپارتمان را وارد کنید..."
                      value={depName}
                      onChange={(e) => setDepName(e.target.value)}
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
          departmentId={DepartmentId}
        />

        {department.length > 0 && (
          <ReactPaginate
            previousLabel={""}
            nextLabel={""}
            pageCount={Math.ceil(department.length / rowsPerPage)}
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

export default Department;
