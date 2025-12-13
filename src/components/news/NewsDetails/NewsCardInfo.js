// ** React Imports
import { useState, Fragment } from "react";

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
import imgg from "../../../assets/images/A/news.jpg";
// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import {
  Check,
  Briefcase,
  X,
  MessageSquare,
  TrendingUp,
  Star,
} from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";
import DOMPurify from "dompurify";
// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { Sortable } from "sortablejs";
import { PersianDateConverter } from "../../../utility/helper/PersianDateConverter";
import { useNavigate } from "react-router-dom";
import EditNewsCatModal from "../NewsCategory/EditNewsCategoryModal";

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

const NewsInfoCard = ({ newsData }) => {
  const navigate = useNavigate();
  // ** State
  const [editStatus, setEditStatus] = useState(false);
  const toggleStatus = (val) => setEditStatus(val);
  const [openEditCat, setOpenEditCat] = useState(false);
  const toggleEditCatModal = (bool) => setOpenEditCat(bool);

  const renderUserImg = () => {
    if (
      newsData?.detailsNewsDto !== null &&
      newsData?.detailsNewsDto?.currentImageAddress
    ) {
      return (
        <img
          height="230"
          width="300"
          alt="user-avatar"
          src={newsData?.detailsNewsDto?.currentImageAddress || imgg}
          className="img-fluid rounded mt-1 mb-1"
        />
      );
    } else {
      return (
        <img
          height="230"
          width="300"
          alt="user-avatar"
          src={imgg}
          className="img-fluid rounded mt-1 mb-1"
        />
      );
    }
  };

  const cleaningDescribe = DOMPurify.sanitize(
    newsData?.detailsNewsDto?.describe
  );
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
                    {newsData?.detailsNewsDto !== null
                      ? newsData?.detailsNewsDto?.title
                      : "Eleanor Aguilar"}
                  </h4>
                  {newsData !== null ? (
                    <Badge
                      color={
                        newsData?.detailsNewsDto?.active
                          ? statusColors["active"]
                          : statusColors["inactive"]
                      }
                      className="text-capitalize"
                    >
                      {newsData?.detailsNewsDto?.active ? "فعال" : "غیرفعال"}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Star className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  {newsData?.detailsNewsDto?.newsRate?.count || 0}
                </h4>
                <small>تعداد امتیاز ها</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <TrendingUp className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  {Math.round(newsData?.detailsNewsDto?.newsRate?.avg) || 0}
                </h4>
                <small>میانتگین امتیاز ها</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزییات</h4>
          <div className="info-container">
            {newsData !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام خبر : </span>
                  <span>{newsData?.detailsNewsDto?.title}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> اخرین بروزرسانی : </span>
                  <span>
                    {PersianDateConverter(newsData?.detailsNewsDto?.updateDate)}
                  </span>
                </li>

                <li className="mb-75">
                  <span className="fw-bolder me-25">تکنولوژی ها :</span>
                  <span>
                    {newsData?.detailsNewsDto?.newsCatregoryName ? (
                      <span style={{ marginLeft: "6px" }}>
                        <Badge
                          color="light-primary"
                          className="text-capitalize "
                        >
                          {newsData?.detailsNewsDto?.newsCatregoryName}
                        </Badge>
                      </span>
                    ) : (
                      "تکنولوژِی ای یافت نشد "
                    )}
                  </span>
                </li>

                <li className="mb-75">
                  <span className="fw-bolder me-25"> عنوان گوگل : </span>
                  <span className="text-capitalize">
                    {newsData?.detailsNewsDto?.googleTitle}
                  </span>
                </li>
              </ul>
            ) : null}
          </div>
          <div
            className="d-flex justify-content-center  "
            style={{ gap: "10px", marginTop: "20px" }}
          >
            <Button
              color="primary"
              style={{ lineHeight: "18px" }}
              onClick={() => {
                navigate(`/create-news/${newsData?.detailsNewsDto?.id}`);
              }}
            >
              ویرایش خبر
            </Button>
            <Button
              onClick={() => setOpenEditCat(true)}
              style={{ lineHeight: "19px" }}
              color="info"
            >
              مدیریت تکنولوژی خبر
            </Button>
          </div>
        </CardBody>
      </Card>
      {openEditCat && (
        <EditNewsCatModal
          isOpen={openEditCat}
          toggleTechModal={toggleEditCatModal}
          editData={newsData}
        />
      )}
    </Fragment>
  );
};

export default NewsInfoCard;
