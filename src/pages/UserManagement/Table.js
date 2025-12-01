import { Fragment, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AddRoleUser from "../../core/services/api/post/AddRoleUser.js";
import DeleteUser from "../../core/services/api/delete/DeleteUser.js";
import Sidebar from "./Sidebar";
import { columns } from "./columns";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
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
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  roleOptions,
  currentRole,
  setCurrentRole,
  setCurrentPage,
}) => {
  // Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";

    if (!array || array.length === 0) return "";

    const keys = Object.keys(array[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0 gap-1">
          <div className="d-flex align-items-center">
            <label style={{ fontSize: "17px" }} htmlFor="rows-per-page">
              تعداد نمایش :
            </label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
          <div className="w-50">
            <Select
              isClearable={true}
              className="react-select"
              classNamePrefix="select"
              placeholder="نقش کاربر را انتخاب کنید..."
              theme={selectThemeColors}
              options={roleOptions}
              value={roleOptions.find((r) => r.value === currentRole)}
              onChange={(e) => {
                setCurrentRole(e ? e.value : "");
                setCurrentPage(1);
              }}
            />
          </div>
        </Col>

        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label
              style={{ fontSize: "17px" }}
              className="mb-0 text-nowrap"
              htmlFor="search-invoice"
            >
              جستجو :
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="نام، ایمیل یا شماره..."
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              اضافه کردن کاربر
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = ({ users = [], isPending, roles = [] }) => {
  const queryClient = useQueryClient();

  const addRoleMutation = useMutation({
    mutationFn: async ({ roleId, userId }) => {
      return AddRoleUser({ roleId, userId });
    },
    onSuccess: () => {
      toast.success("نقش کاربر با موفقیت اضافه شد");
      queryClient.invalidateQueries({ queryKey: ["GetAllUser"] });
    },
    onError: () => {
      toast.error("خطا در افزودن نقش");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId) => {
      return DeleteUser({ userId });
    },
    onSuccess: () => {
      toast.success("کاربر با موفقیت حذف شد");

      queryClient.invalidateQueries({ queryKey: ["GetAllUser"] });
    },
    onError: (error) => {
      toast.error("خطا در حذف کاربر");
    },
  });

  const handleDeleteUser = (userId) => {
    deleteUserMutation.mutate(userId);
  };

  // States
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleOpenModal = (row) => {
    setSelectedUser(row);

    const userRolesArr = row.roles
      ? row.roles.map((r) => String(r).trim())
      : row.userRoles
      ? row.userRoles.split(",").map((r) => String(r).trim())
      : [];

    const selected = userRolesArr.map((r) => ({
      value: String(r).toLowerCase(),
      label: r,
    }));

    setSelectedRoles(selected);

    setIsActive(false);

    setOpenModal(true);
  };

  const [currentRole, setCurrentRole] = useState("");

  const roleOptions = [
    { value: "", label: "نقش کاربر را انتخاب کنید..." },
    ...Array.from(
      new Set(
        users.flatMap((u) =>
          u.roles ? u.roles.map((r) => String(r).toLowerCase()) : []
        )
      )
    ).map((role) => ({ value: role, label: role })),
  ];

  const filteredData = users.filter((item) => {
    const term = searchTerm.trim().toLowerCase();

    const matchesSearch =
      term === "" ||
      (item.fname && item.fname.toLowerCase().includes(term)) ||
      (item.lname && item.lname.toLowerCase().includes(term)) ||
      (item.gmail && item.gmail.toLowerCase().includes(term)) ||
      (item.phoneNumber && item.phoneNumber.includes(term));

    const matchesRole =
      currentRole === "" ||
      (item.roles &&
        item.roles.map((r) => String(r).toLowerCase()).includes(currentRole));

    return matchesSearch && matchesRole;
  });

  const handlePagination = (page) => setCurrentPage(page.selected + 1);

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.currentTarget.value));
    setCurrentPage(1);
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const dataToRender = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const CustomPagination = () => {
    const count = Math.ceil(filteredData.length / rowsPerPage);
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
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
    );
  };

  const tableColumns = columns({ handleOpenModal, handleDeleteUser });

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const allRolesOptions = (() => {
    const rolesU = users.flatMap((u) => {
      if (u.roles && Array.isArray(u.roles))
        return u.roles.map((r) => String(r).trim());
      if (u.userRoles && typeof u.userRoles === "string")
        return u.userRoles.split(",").map((r) => String(r).trim());
      return [];
    });

    const unique = Array.from(new Set(rolesU.filter((r) => r && r.length)));

    return unique.map((role) => ({
      value: String(role).toLowerCase(),
      label: role,
    }));
  })();
  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer={false}
            pagination
            responsive
            paginationServer
            columns={tableColumns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            progressPending={isPending}
            subHeaderComponent={
              <CustomHeader
                roleOptions={roleOptions}
                currentRole={currentRole}
                setCurrentPage={setCurrentPage}
                setCurrentRole={setCurrentRole}
                data={filteredData}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Modal
        isOpen={openModal}
        toggle={() => setOpenModal(false)}
        className="modal-dialog-centered"
        style={{ maxWidth: "450px" }}
      >
        <ModalBody>
          <p className="mb-1 pt-2 text-center fw-bold fs-5">ویرایش نقش کاربر</p>
          {selectedUser && (
            <div className="mt-3 pt-3 pb-3 border-top d-flex align-items-center gap-1">
              <span className="fw-medium">نام:</span>
              <span className="text-primary">
                {selectedUser.fname} {selectedUser.lname}
              </span>
            </div>
          )}
          <div className="mb-4">
            <Label className="form-label fw-semibold" for="user-roles">
              نقش‌ها
            </Label>
            <Select
              isMulti
              name="roles"
              options={allRolesOptions}
              className="react-select"
              placeholder="نقش خود را انتخاب کنید..."
              classNamePrefix="select"
              value={selectedRoles}
              onChange={(val) => setSelectedRoles(val)}
              theme={selectThemeColors}
              noOptionsMessage={() =>
                selectedRoles.length === allRolesOptions.length &&
                "تمام نقش‌های موجود انتخاب شده‌اند"
              }
            />
          </div>
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2">
              <div className="form-switch form-check-primary">
                <Input
                  type="switch"
                  id="user-status"
                  checked={isActive}
                  onChange={() => {
                    const newStatus = !isActive;
                    setIsActive(newStatus);

                    if (newStatus) {
                      setSelectedRoles(
                        allRolesOptions.map((r) => ({
                          value: r.value,
                          label: r.label,
                        }))
                      );
                    } else {
                      setSelectedRoles([]);
                    }
                  }}
                />
              </div>
              <span>{isActive ? "فعال" : "غیرفعال"}</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="secondary" outline onClick={() => setOpenModal(false)}>
            انصراف
          </Button>
          <Button
            color="primary"
            onClick={() => {
              if (!selectedUser || selectedRoles.length === 0) {
                toast.error("حداقل یک نقش انتخاب کنید");
                return;
              }

              const selectedRoleValue = selectedRoles[0]?.value
                .trim()
                .toLowerCase();

              const roleId = roles.find(
                (r) => r.name.toLowerCase().trim() === selectedRoleValue
              )?.id;

              const currentUserRoles = selectedUser.userRoles
                ? selectedUser.userRoles
                    .split(",")
                    .map((r) => r.trim().toLowerCase())
                : [];

              if (currentUserRoles.includes(selectedRoleValue)) {
                toast.error(`کاربر از قبل دارای نقش ${selectedRoleValue} است.`);
                setOpenModal(false);
                return;
              }

              addRoleMutation.mutate({
                roleId,
                userId: selectedUser.id,
              });

              setOpenModal(false);
            }}
          >
            ارسال
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default UsersList;
