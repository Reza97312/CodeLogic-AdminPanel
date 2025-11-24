import { useQuery } from "@tanstack/react-query";
import getNews from '../../../core/services/api/get/getNews'
import { Fragment, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { columns } from "./columns";
import { getAllData, getData } from "./store";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {ChevronDown} from "react-feather";
import { selectThemeColors } from "@utils";
import {Card, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomHeader from './CustomHeader/CustomHeader'


const NewsList = () => {

  const [searchQuery, setSearchQuery] = useState()
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm)
  }


  const { data: newsData, isLoading } = useQuery({
    queryKey: ["GETNEWS", searchQuery],
    queryFn: () => getNews({Query: searchQuery}),
  });









  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);

  // ** States
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleOpenModal = (row) => {
    setSelectedUser(row);
    setOpenModal(true);
  };

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData());
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
  }, [dispatch, store.data.length, sort, sortColumn, currentPage]);

  // ** User filter options
  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: "author", label: "Author" },
    { value: "editor", label: "Editor" },
    { value: "maintainer", label: "Maintainer" },
    { value: "subscriber", label: "Subscriber" },
  ];

  const planOptions = [
    { value: "", label: "Select Plan" },
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "pending", label: "Pending", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
      })
    );
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
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

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
  };

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const tableColumns = columns({ handleOpenModal });

  const allRolesOptions = [
    { value: "employee.admin", label: "Employee.Admin" },
    { value: "administrator", label: "Administrator" },
    { value: "student", label: "Student" },
    { value: "editor", label: "Editor" },
    { value: "contributor", label: "Contributor" },
  ];




  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">Role</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value,
                      currentPlan: currentPlan.value,
                    })
                  );
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">Plan</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
                      status: currentStatus.value,
                    })
                  );
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: currentPlan.value,
                    })
                  );
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}

      {
        <Card className="overflow-hidden">
          <div className="react-dataTable">
            <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={tableColumns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={newsData?.news || []}
            subHeaderComponent={
              <CustomHeader
                handleSearch={handleSearch}
                store={store}
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
      }

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Modal
        isOpen={openModal}
        toggle={() => setOpenModal(false)}
        className="modal-dialog-centered"
        style={{ maxWidth: "600px" }}
      >
        <ModalBody>
          <p
            className="mb-1 pt-2 text-center fw-bold fs-5"
            style={{ letterSpacing: "0.5px" }}
          >
            ویرایش نقش کاربر
          </p>

          <p
            className="mb-2 text-center text-muted"
            style={{ fontSize: "0.95rem" }}
          >
            برای ویرایش نقش کاربر از گزینه‌های زیر استفاده کنید.
          </p>

          {selectedUser && (
            <div className="mt-3 pt-3 pb-3 border-top d-flex align-items-center gap-1">
              <span className="fw-medium">نام:</span>
              <span className="text-primary">{selectedUser.fullName}</span>
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
              classNamePrefix="select"
              value={selectedRoles}
              onChange={setSelectedRoles}
              theme={selectThemeColors}
              placeholder="نقش‌ها را انتخاب کنید..."
            />
          </div>

          <div className="mb-4">
            <Label className="form-label mb-2 fw-semibold" for="user-status">
              فعال سازی همه
            </Label>

            <div className="d-flex align-items-center gap-2">
              <div className="form-switch form-check-primary">
                <Input
                  type="switch"
                  id="user-status"
                  name="user-status"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
              </div>

              <span
                className={`fw-medium ${
                  isActive ? "text-success" : "text-secondary"
                }`}
              >
                {isActive ? "فعال" : "غیرفعال"}
              </span>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="d-flex justify-content-between">
          <Button
            color="secondary"
            outline
            onClick={() => setOpenModal(false)}
            style={{
              padding: "0.5rem 1.2rem",
              borderRadius: "6px",
              transition: "all 0.2s",
            }}
          >
            انصراف
          </Button>

          <Button
            color="primary"
            onClick={() => setOpenModal(false)}
            style={{
              padding: "0.5rem 1.5rem",
              borderRadius: "6px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              transition: "all 0.2s",
            }}
          >
            ارسال
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default NewsList;
