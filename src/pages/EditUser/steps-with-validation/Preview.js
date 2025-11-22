import { Fragment } from "react";

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

// Reactstrap Imports
import { Form, Button, Row, Col, Badge } from "reactstrap";

const Preview = () => {
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
          ) : isLink ? (
            <a className="text-primary text-decoration-none font-medium-1">
              {value}
            </a>
          ) : (
            <span className="d-block font-medium-2 text-dark">{value}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="content-header mb-4">
        <h5 className="mb-0  fw-bolder">پیش نمایش اطلاعات کاربر</h5>
      </div>
      <Form>
        <div className="text-center mb-5">
          <div
            className="d-inline-block position-relative rounded-circle p-1 bg-white shadow-sm"
            style={{ marginTop: "-30px" }}
          >
            <img
              src=""
              className="rounded-circle img-fluid"
              width="130"
              height="130"
              style={{ objectFit: "cover", border: "3px solid #f8f9fa" }}
            />
          </div>
          <h3 className="fw-bolder mt-2 mb-0 text-dark">مصطفی انجین</h3>
          <span className="badge bg-light-primary text-primary p-1 mt-1">
            طراح بک اند کارگاه ریکت
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

              <InfoItem icon={User} label="نام کاربری" value="mostafa" />
              <InfoItem icon={Hash} label="کد ملی" value="6774042147" />
              <InfoItem icon={Calendar} label="تاریخ تولد" value="12/9/2024" />
              <InfoItem icon={User} label="جنسیت" value="مرد" />
              <InfoItem
                icon={Mail}
                label="آدرس ایمیل"
                value="mostafachronic@gmail.com"
              />
              <InfoItem icon={Phone} label="شماره تلفن" value="09394510553" />
            </Col>

            <Col className="text-center" md={6}>
              <Badge
                style={{ fontSize: "14px" }}
                color="light-primary"
                className="fw-bolder mb-4 text-primary   border-bottom d-inline-block p-1 ms-4 "
              >
                محل سکونت و دسترسی‌ها
              </Badge>

              <InfoItem icon={MapPin} label="آدرس خانه">
                مازندران، ساری، پژوهشگاه سپهر 21
              </InfoItem>

              <InfoItem icon={Link} label="لینکدین" value="t.mww" isLink />
              <InfoItem icon={Link} label="تلگرام" value="t.me" isLink />

              <InfoItem icon={Shield} label="تایید دو مرحله‌ای">
                <Badge color="light-danger">غیرفعال</Badge>
              </InfoItem>

              <div className="d-flex align-items-start mb-3">
                <div>
                  <small className="d-block text-muted fw-bolder mb-2 ms-5">
                    نقش‌ها:
                  </small>
                  <div className="d-flex flex-wrap align-items-start justify-content-center gap-1  text-center ms-5">
                    {[
                      "TournamentMentor",
                      "Employee",
                      "Writer",
                      "Student",
                      "Teacher",
                      "Support",
                      "Employee.Admin",
                      "TournamentAdmin",
                      "Referee",
                      "Administrator",
                    ].map((role) => (
                      <Badge
                        key={role}
                        color="light-secondary"
                        className="fw-normal mb-1 "
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="d-flex justify-content-between mt-5 pt-3 ">
          <Button color="secondary" className="btn-prev" outline disabled>
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
