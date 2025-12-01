import { Fragment } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// Third Party Components
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  Link,
  Shield,
  Calendar,
  Hash,
} from "react-feather";

import { Form, Button, Row, Col, Badge } from "reactstrap";

const Preview = ({ stepper, initialData }) => {
  const PersianDate = (isoDate) => {
    if (!isoDate) return "ثبت نشده";
    try {
      const date = new DateObject({ date: isoDate });
      return date.format("YYYY/MM/DD", {
        calendar: persian,
        locale: persian_fa,
      });
    } catch (e) {
      return isoDate;
    }
  };

  const GenderText = (gender) => {
    if (gender === true) return "مرد";
    if (gender === false) return "زن";
    return "نامشخص";
  };

  const TwoStepStatus = (status) => {
    return status === true ? (
      <Badge color="light-success">فعال</Badge>
    ) : (
      <Badge color="light-danger">غیرفعال</Badge>
    );
  };

  const SocLink = (link) => {
    const parts = link;
    return parts;
  };

  const InfoItem = ({ icon: Icon, label, value, isLink = false, children }) => {
    return (
      <div className="d-flex align-items-center justify-content-center mb-3 text-center">
        <div className="ms-5 mt-1">
          <Icon size={18} className="text-primary" style={{ opacity: 0.7 }} />
        </div>
        <div className="flex-grow-1 ">
          <small className="d-block text-muted fw-bolder mb-1">{label}:</small>
          {children ? (
            children
          ) : isLink && value && value !== "ثبت نشده" ? (
            <a className="text-primary text-decoration-none font-medium-1">
              {SocLink(value)}
            </a>
          ) : (
            <span className="d-block font-medium-2 text-dark">{value}</span>
          )}
        </div>
      </div>
    );
  };

  const {
    fName,
    lName,
    userName,
    gmail,
    phoneNumber,
    nationalCode,
    birthDay,
    gender,
    currentPictureAddress,
    homeAdderess,
    linkdinProfile,
    telegramLink,
    twoStepAuth,
    roles,
    userAbout,
  } = initialData;

  return (
    <Fragment>
      <div className="content-header mb-4">
        <h5 className="mb-0  fw-bolder">پیش نمایش اطلاعات کاربر</h5>
      </div>
      <Form>
        <div className="text-center mb-5">
          <div
            className="d-inline-block position-relative rounded-circle p-1  "
            style={{ marginTop: "-30px" }}
          >
            <img
              src={currentPictureAddress}
              className="rounded-circle img-fluid"
              width="230"
              height="230"
              style={{
                objectFit: "cover",
                boxShadow: "0 0 30px 15px rgba(13, 110, 253, 0.5)",
              }}
              alt="Profile"
            />
          </div>

          <h3 className="fw-bolder mt-2 mb-0 text-dark">
            {fName} {lName}
          </h3>

          <span className="badge bg-light-primary text-primary p-1 mt-1">
            {userAbout}
          </span>
        </div>

        <div className="px-2 px-md-4">
          <Row>
            <Col md={6} className="mb-4 mb-md-0 ps-md-4  text-center">
              <Badge
                style={{ fontSize: "14px" }}
                color="light-primary"
                className="fw-bolder  mb-4 text-primary  border-bottom d-inline-block p-1 ms-4 "
              >
                اطلاعات پایه و تماس
              </Badge>

              <InfoItem icon={User} label="نام کاربری" value={userName} />
              <InfoItem icon={Hash} label="کد ملی" value={nationalCode} />
              <InfoItem
                icon={Calendar}
                label="تاریخ تولد"
                value={PersianDate(birthDay)}
              />
              <InfoItem icon={User} label="جنسیت" value={GenderText(gender)} />
              <InfoItem icon={Mail} label="آدرس ایمیل" value={gmail} />
              <InfoItem icon={Phone} label="شماره تلفن" value={phoneNumber} />
            </Col>

            <Col className="text-center" md={6}>
              <Badge
                style={{ fontSize: "14px" }}
                color="light-primary"
                className="fw-bolder mb-4 text-primary   border-bottom d-inline-block p-1 ms-4 "
              >
                محل سکونت و دسترسی‌ها
              </Badge>

              <InfoItem icon={MapPin} label="آدرس خانه" value={homeAdderess} />
              <InfoItem
                icon={Link}
                label="لینکدین"
                value={linkdinProfile}
                isLink
              />
              <InfoItem
                icon={Link}
                label="تلگرام"
                value={telegramLink}
                isLink
              />

              <InfoItem icon={Shield} label="تایید دو مرحله‌ای">
                {TwoStepStatus(twoStepAuth)}
              </InfoItem>

              <div className="d-flex align-items-start mb-3">
                <div>
                  <small className="d-block text-muted fw-bolder mb-2 ms-5">
                    نقش‌ها:
                  </small>
                  <div className="d-flex flex-wrap align-items-start justify-content-center gap-1  text-center ms-5">
                    {roles.map((role) => (
                      <Badge
                        key={role.roleName}
                        color="light-secondary"
                        className="fw-normal mb-1 "
                      >
                        {role.roleName}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="d-flex justify-content-between mt-5 pt-3 ">
          <Button
            color="secondary"
            className="btn-prev"
            outline
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="success" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              تایید اطلاعات
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Preview;
