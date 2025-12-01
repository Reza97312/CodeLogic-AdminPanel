// ** React Imports
import { useState, Fragment } from "react";
import loading from "../../../../assets/images/A/loading.gif";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X, MessageSquare, TrendingUp } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { Sortable } from "sortablejs";
import { PersianDateConverter } from "../../../../utility/helper/PersianDateConverter";
import { useNavigate } from "react-router-dom";
import CourseStatus from "../../ChangeStatus/CourseStatus";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const MySwal = withReactContent(Swal);

const CourseInfoCard = ({ selectedCourse, toggleTechModal }) => {
  const navigate = useNavigate();
  // ** State
  const [editStatus, setEditStatus] = useState(false);
  const toggleStatus = (val) => setEditStatus(val);

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: selectedCourse.courseId,
    },
  });

  // ** render user img
  const renderUserImg = () => {
    if (selectedCourse !== null && selectedCourse?.imageAddress) {
      return (
        <img
          height="230"
          width="300"
          alt="user-avatar"
          src={selectedCourse?.imageAddress || "-"}
          className="img-fluid rounded mt-1 mb-1"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mt-3 mb-2"
          content={selectedCourse?.title || "-"}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const handleReset = () => {
    reset({
      username: selectedCourse.username,
      lastName: selectedCourse.fullName.split(" ")[1],
      firstName: selectedCourse.fullName.split(" ")[0],
    });
  };

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend user!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Suspended!",
          text: "User has been suspended.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {selectedCourse !== null
                      ? selectedCourse?.title
                      : "Eleanor Aguilar"}
                  </h4>
                  {selectedCourse !== null ? (
                    <Badge
                      color={
                        selectedCourse?.isActive
                          ? statusColors["active"]
                          : statusColors["inactive"]
                      }
                      className="text-capitalize"
                    >
                      {selectedCourse.isActive ? "فعال" : "غیرفعال"}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <MessageSquare className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedCourse?.courseCommentTotal}</h4>
                <small>تعداد کامنت</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <TrendingUp className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedCourse?.capacity || "-"}</h4>
                <small>ظرفیت</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزییات</h4>
          <div className="info-container">
            {selectedCourse !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام دوره : </span>
                  <span>{selectedCourse?.title}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">زمان شروع : </span>
                  <span>{PersianDateConverter(selectedCourse?.startTime)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">زمان پایان :</span>
                  <span>{PersianDateConverter(selectedCourse?.endTime)}</span>
                </li>

                <li className="mb-75">
                  <span className="fw-bolder me-25">تکنولوژی ها :</span>
                  <span>
                    {selectedCourse.courseTeches.length > 0
                      ? selectedCourse.courseTeches.map((r, index) => (
                          <span style={{ marginLeft: "6px" }}>
                            <Badge
                              key={index}
                              color="light-primary"
                              className="text-capitalize "
                            >
                              {r}
                            </Badge>
                          </span>
                        ))
                      : "تکنولوژِی ای یافت نشد "}
                  </span>
                </li>

                <li className="mb-75">
                  <span className="fw-bolder me-25">تعداد رزرو ها : </span>
                  <span className="text-capitalize">
                    {selectedCourse?.reserveUserTotal}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت دوره :</span>
                  <span>{selectedCourse?.statusName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">قیمت دوره :</span>
                  <span>{selectedCourse?.cost.toLocaleString()}تومان</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">توضیحات :</span>
                  <span>{selectedCourse?.describe}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام استاد : </span>
                  <span>{selectedCourse?.teacherName}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div
            className="d-flex justify-content-center  "
            style={{ gap: "10px" }}
          >
            <Button onClick={() => setEditStatus(true)} color="warning">
              تغییر وضعیت دوره
            </Button>
            <Button
              color="primary"
              onClick={() =>
                navigate("/courses/create", {
                  state: {
                    isEdit: true,
                    updateData: selectedCourse,
                  },
                })
              }
            >
              ویرایش دوره
            </Button>
            <Button onClick={() => toggleTechModal(true)} color="info">
              افزودن تکنولوژی
            </Button>
          </div>
        </CardBody>
      </Card>
      {editStatus && (
        <CourseStatus
          detailsData={selectedCourse}
          isOpen={editStatus}
          toggleStatus={toggleStatus}
        />
      )}
    </Fragment>
  );
};

export default CourseInfoCard;
