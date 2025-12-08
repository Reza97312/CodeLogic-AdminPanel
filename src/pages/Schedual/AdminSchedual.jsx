import {
  Button,
  Card,
  CardHeader,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Row,
  CardBody,
} from "reactstrap";
import { ChevronDown, Search } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { parseISO } from "date-fns";
import moment from "moment-jalaali";
import empty from "../../assets/images/icons/empty.json";
import GetAdminSchedual from "../../core/services/api/get/GetAdminSchedual";
import { UpdateSchedual } from "../../core/services/api/put/UpdateSchedual";
import Lottie from "lottie-react";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import infinity from "../../assets/images/icons/Infinity Loader.json";
import { GetAllCourses } from "../../core/services/api/get/Courses/GetAllCourses";
import img5 from "../../assets/images/icons/HTML5Course.png";
import { GetCourseGroups } from "../../core/services/api/get/Courses/GetCourseGroups";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { AddSchedual } from "../../core/services/api/post/AddSchedual";

const ShamsiCal = ({ onDateChange }) => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const startDay = selectedDayRange.from;
      const endDay = selectedDayRange.to;

      const shamsiStart = `${startDay.year}/${startDay.month}/${startDay.day}`;
      const shamsiEnd = `${endDay.year}/${endDay.month}/${endDay.day}`;

      const isoStartDate = moment(shamsiStart, "jYYYY/jM/jD").toDate();
      const isoEndDate = moment(shamsiEnd, "jYYYY/jM/jD").endOf("day").toDate();

      onDateChange(isoStartDate, isoEndDate);
    } else if (selectedDayRange.from && !selectedDayRange.to) {
      onDateChange(null, null);
    } else {
      onDateChange(null, null);
    }
  }, [selectedDayRange]);

  const handleClearFilter = () => {
    setSelectedDayRange({ from: null, to: null });
    onDateChange(null, null);
  };

  return (
    <div className="p-1 d-flex flex-column align-items-center justify-content-center h-100">
      <Calendar
        value={selectedDayRange}
        onChange={setSelectedDayRange}
        shouldHighlightWeekends
        locale="fa"
        calendarTodayClassName="custom-today-class"
        colorPrimary="#007bff"
        inputPlaceholder="انتخاب بازه"
      />

      <Button
        color="primary"
        block
        className="mt-2"
        onClick={handleClearFilter}
        outline={!selectedDayRange.from}
      >
        پاک کردن فیلتر تاریخ
      </Button>
    </div>
  );
};

const CourseSelect = ({ isOpen, toggle, SelectCourse }) => {
  const [searchText, setSearchText] = useState("");

  const { data: coursesData, isLoading } = useQuery({
    queryKey: ["GetAllCourses"],
    queryFn: () => GetAllCourses({ RowsOfPage: 1000 }),
  });

  const coursesList = coursesData?.courseDtos || [];

  const filteredCourses = useMemo(() => {
    return coursesList.filter((course) =>
      course.title.toLowerCase().includes(searchText.toLowerCase())
    );
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
      name: "تصویر",
      center: true,
      width: "25%",
      cell: (row) => (
        <div
          style={{
            width: "40px",
            height: "40px",
            overflow: "hidden",
            borderRadius: "5px",
          }}
        >
          {row.tumbImageAddress ? (
            <img
              src={row.tumbImageAddress}
              style={{ width: "100%", height: "100%" }}
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
      name: "نام دوره",
      selector: (row) => row.title,
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
      <ModalHeader toggle={toggle}>دوره را انتخاب کنید</ModalHeader>
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
              <p> دوره‌ای یافت نشد</p>
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

const AddSchedualModal = ({ modalOpen, toggleModal }) => {
  const queryClient = useQueryClient();

  const [courseSelect, setCourseSelect] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState();
  const [startDate, setStartDate] = useState(null);
  const [weeklyClasses, setWeeklyClasses] = useState(2);
  const [startTime, setStartTime] = useState(13);
  const [endTime, setEndTime] = useState(14);
  const [totalClasses, setTotalClasses] = useState(3);

  const toggleCourseSelect = () => setCourseSelect(!courseSelect);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    toast.info(` دوره ${course.title} انتخاب شد`);
  };

  const { data: courseGroupsData, isLoading: isLoadingGroups } = useQuery({
    queryKey: [
      "GetCourseGroups",
      selectedCourse?.courseId,
      selectedCourse?.teacher?.id,
    ],
    queryFn: () =>
      GetCourseGroups({
        course: selectedCourse.courseId,
        teacher: selectedCourse.teacher.id,
      }),

    enabled: !!selectedCourse?.courseId && !!selectedCourse?.teacher?.id,
  });

  const courseGroups = courseGroupsData || [];

  const addSchedualMutation = useMutation({
    mutationFn: ({ payload, courseId }) => AddSchedual(payload, courseId),
    onSuccess: () => {
      toast.success("بازه زمانی با موفقیت اضافه شد");
      queryClient.invalidateQueries(["GetAdminSchedual"]);
      toggleModal();
    },
    onError: (error) => {
      console.error(error);
      const message =
        error?.response?.data?.message || "مشکلی در ثبت بازه زمانی رخ داد";
      toast.error(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCourse?.courseId || !selectedGroup || !startDate) {
      toast.warn("لطفا دوره، گروه و تاریخ شروع را به طور کامل انتخاب کنید");
      return;
    }

    const formattedStartDate = startDate;

    const payload = {
      courseGroupId: selectedGroup,
      startDate: formattedStartDate,
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      weekNumber: totalClasses,
      rowEffect: weeklyClasses,
    };

    const courseId = selectedCourse.courseId;

    addSchedualMutation.mutate({ payload, courseId });
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggleModal}>افزودن بازه زمانی جدید</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="courseSelect">انتخاب دوره</Label>
                  <Input
                    type="text"
                    id="courseSelect"
                    value={selectedCourse ? selectedCourse.title : ""}
                    placeholder="دوره را انتخاب کنید"
                    readOnly
                    onClick={toggleCourseSelect}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      color: "black",
                    }}
                  />

                  <input
                    type="hidden"
                    value={selectedCourse ? selectedCourse.courseId : ""}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="courseGroup">گروه دوره</Label>
                  <Input
                    type="select"
                    id="courseGroup"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    disabled={!selectedCourse || isLoadingGroups}
                  >
                    <option value="" disabled>
                      {isLoadingGroups
                        ? "درحال بارگذاری..."
                        : selectedCourse
                        ? "یک گروه را انتخاب کنید"
                        : "ابتدا دوره را انتخاب کنید"}
                    </option>

                    {courseGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.groupName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate">تاریخ شروع</Label>
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={
                      startDate
                        ? new DateObject({
                            date: startDate,
                            calendar: persian,
                            locale: persian_fa,
                          })
                        : null
                    }
                    onChange={(date) => {
                      setStartDate(date ? date.toDate().toISOString() : null);
                    }}
                    placeholder="تاریخ شروع را انتخاب کنید"
                    containerClassName="w-100"
                    inputClass="form-control w-100 cursor-pointer"
                    style={{
                      width: "100%",
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="weeklyClasses">تعداد کلاس در هفته</Label>
                  <Input
                    type="number"
                    id="weeklyClasses"
                    value={weeklyClasses}
                    onChange={(e) => setWeeklyClasses(parseInt(e.target.value))}
                    disabled={addSchedualMutation.isLoading}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="startTime">ساعت شروع</Label>
                  <Input
                    type="number"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(parseInt(e.target.value))}
                    disabled={addSchedualMutation.isLoading}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="endTime">ساعت پایان</Label>
                  <Input
                    type="number"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(parseInt(e.target.value))}
                    disabled={addSchedualMutation.isLoading}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mt-2 mb-3 align-items-center">
              <Col md={6}>
                <FormGroup>
                  <Label for="totalClasses">تعداد کل کلاس‌ها</Label>
                  <Input
                    type="number"
                    id="totalClasses"
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(parseInt(e.target.value))}
                    disabled={addSchedualMutation.isLoading}
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex justify-content-between gap-2 mt-3">
              <Button color="secondary" onClick={toggleModal} outline>
                انصراف
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={addSchedualMutation.isLoading}
              >
                {addSchedualMutation.isLoading
                  ? "درحال ثبت..."
                  : "ثبت بازه زمانی"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <CourseSelect
        isOpen={courseSelect}
        toggle={toggleCourseSelect}
        SelectCourse={handleCourseSelect}
      />
    </>
  );
};

const AdminSchedual = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["GetAdminSchedual"],
    queryFn: () => GetAdminSchedual(),
  });

  const adshedual = data ?? [];

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleDateChange = useCallback((start, end) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    setCurrentPage(1);
  }, []);

  const updateMutation = useMutation({
    mutationFn: (data) => UpdateSchedual(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["GetAdminSchedual"]);

      if (variables.active) {
        toast.success("بازه زمانی با موفقیت فعال شد");
      } else {
        toast.success("بازه زمانی با موفقیت غیرفعال شد");
      }
    },
    onError: () => {
      toast.error("مشکلی در تغییر وضعیت رخ داد");
    },
  });

  const handleChangeStatus = (row, newStatus) => {
    if (row.AP === newStatus) {
      toast.info(
        newStatus
          ? "شما قبلا این بازه زمانی را فعال کرده‌اید"
          : "شما قبلا این بازه زمانی را غیرفعال کرده‌اید"
      );
      return;
    }

    const payload = {
      active: newStatus,
      id: row.id,
    };

    updateMutation.mutate(payload);
  };

  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const toggleAddModal = () => setAddModalOpen(!addModalOpen);

  const filteredData = useMemo(() => {
    return adshedual.filter((item) => {
      let statusMatch = true;
      if (filterStatus === "active") {
        statusMatch = item.AP === true;
      } else if (filterStatus === "notactive") {
        statusMatch = item.AP === false;
      }

      let dateMatch = true;
      if (selectedStartDate && selectedEndDate && item.startDate) {
        try {
          const itemDate = parseISO(item.startDate);

          const isAfterStart =
            itemDate.getTime() >= selectedStartDate.getTime();
          const isBeforeEnd = itemDate.getTime() <= selectedEndDate.getTime();

          dateMatch = isAfterStart && isBeforeEnd;
        } catch (e) {
          dateMatch = false;
        }
      }

      return statusMatch && dateMatch;
    });
  }, [adshedual, filterStatus, selectedStartDate, selectedEndDate]);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const PersianNumber = (num) => {
    if (!num) return "";
    return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  const columns = [
    {
      sortable: true,
      width: "20%",
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
      width: "20%",
      cell: (row) => {
        return (
          <div className="d-flex justify-content-center align-items-center w-100 text-center">
            <small className="mb-1 text-truncate fw-bolder ">
              {row.startDate
                ? new Date(row.startDate).toLocaleDateString("fa-IR")
                : "نامشخص"}
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
      width: "20%",
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
      width: "15%",
      cell: (row) => {
        const isAccept = row.AP === true;

        return (
          <div className="d-flex justify-content-center w-100">
            <span
              style={{ padding: "7px", borderRadius: "9999px" }}
              className={`badge ${isAccept ? "bg-success" : "bg-danger"}`}
            >
              {isAccept ? "فعال " : "غیرفعال "}
            </span>
          </div>
        );
      },
      center: true,
    },
    {
      name: "اقدام",
      width: "25%",
      cell: (row) => (
        <div className="  d-flex justify-content-between align-items-center gap-1">
          <Button
            outline
            color="success"
            className="text-nowrap btn-hover-fill"
            style={{ fontSize: "10px" }}
            size="sm"
            onClick={() => handleChangeStatus(row, true)}
          >
            فعال کردن
          </Button>
          <Button
            outline
            color="danger"
            className="text-nowrap btn-hover-fillr"
            style={{ fontSize: "10px" }}
            size="sm"
            onClick={() => handleChangeStatus(row, false)}
          >
            غیرفعال کردن
          </Button>
        </div>
      ),
      center: true,
    },
  ];

  if (isLoading) {
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
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h4 tag="h4" className="mb-0">
              بازه زمانی ادمین
            </h4>
            <div className="d-flex justify-content-between gap-2">
              <Input
                type="select"
                style={{ width: "150px" }}
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="active"> فعال </option>
                <option value="notactive"> غیرفعال </option>
              </Input>
              <Button color="primary" onClick={toggleAddModal}>
                افزودن بازه زمانی
              </Button>
            </div>
          </CardHeader>
          <div className="react-dataTable user-view-account-projects">
            {paginatedData.length > 0 ? (
              <DataTable
                noHeader
                responsive={false}
                columns={columns}
                data={paginatedData}
                className="react-dataTable"
                sortIcon={<ChevronDown size={10} />}
              />
            ) : (
              <div
                style={{ marginTop: "70px" }}
                className="d-flex flex-column align-items-center justify-content-center text-center"
              >
                <Lottie
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "10px",
                  }}
                  animationData={empty}
                />
                <p> نتیجه ای یافت نشد </p>
              </div>
            )}

            {filteredData.length > 0 && (
              <ReactPaginate
                previousLabel={""}
                nextLabel={""}
                pageCount={Math.ceil(filteredData.length / rowsPerPage)}
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

      <Col xl="4">
        <Card className=" text-center h-100">
          <CardBody className="p-0  h-100">
            <ShamsiCal onDateChange={handleDateChange} />
          </CardBody>
        </Card>
      </Col>

      <AddSchedualModal modalOpen={addModalOpen} toggleModal={toggleAddModal} />
    </div>
  );
};

export default AdminSchedual;
