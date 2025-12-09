import { Button, Card, CardHeader, Col, Input, CardBody } from "reactstrap";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { parseISO } from "date-fns";
import moment from "moment-jalaali";
import empty from "../../assets/images/icons/empty.json";
import { UpdateSchedual } from "../../core/services/api/put/UpdateSchedual";
import Lottie from "lottie-react";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import infinity from "../../assets/images/icons/Infinity Loader.json";
import GetTeacherSchedual from "../../core/services/api/get/GetTeacherSchedual";

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

const TeacherSchedual = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["GetTeacherSchedual"],
    queryFn: () => GetTeacherSchedual(),
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
      queryClient.invalidateQueries(["GetTeacherSchedual"]);

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
              بازه زمانی استاد
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
    </div>
  );
};

export default TeacherSchedual;
