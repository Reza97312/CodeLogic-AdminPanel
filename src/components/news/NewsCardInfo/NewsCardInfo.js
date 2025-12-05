// ** React Imports
import { useState, Fragment } from "react";
import loading from "../../../assets/images/A/loading.gif";
// ** Reactstrap Imports
import {Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader} from "reactstrap";

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

import {PersianDateConverter} from '../../../utility/helper/PersianDateConverter'



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

const NewsInfoCard = ({ selectedNews }) => {
  // ** State
  const [show, setShow] = useState(false);

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: selectedNews.id,
    },
  });

  // ** render user img
  const renderUserImg = () => {
    if (selectedNews !== null && selectedNews?.currentImageAddress) {
      return (
        <img
          height="230"
          width="300"
          alt="user-avatar"
          src={selectedNews?.currentImageAddress || "-"}
          className="img-fluid rounded mt-1 mb-1"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mt-3 mb-2"
          content={selectedNews?.title || "-"}
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
      username: selectedNews.username,
      lastName: selectedNews.fullName.split(" ")[1],
      firstName: selectedNews.fullName.split(" ")[0],
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
                    {selectedNews !== null
                      ? selectedNews?.title
                      : "Eleanor Aguilar"}
                  </h4>
                  {selectedNews !== null ? (
                    <Badge
                      color={
                        selectedNews?.isActive
                          ? statusColors["active"]
                          : statusColors["inactive"]
                      }
                      className="text-capitalize"
                    >
                      {selectedNews?.isActive ? "فعال" : "غیرفعال"}
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
                <h4 className="mb-0">{selectedNews?.newsComment.length}</h4>
                <small>تعداد کامنت</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {selectedNews !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">زمان شروع :</span>
                  <span>{PersianDateConverter(selectedNews?.insertDate)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">آخرین تغییرات :</span>
                  <span>{PersianDateConverter(selectedNews?.updateDate)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">عنوان گوگل :</span>
                  <span>
                    {selectedNews?.googleTitle}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">توضیحات گوگل :</span>
                  <span>{selectedNews?.googleDescribe}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">توضیحات جزئی :</span>
                  <span>{selectedNews?.miniDescribe}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">توضیحات :</span>
                  <span>{selectedNews?.describe}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">امتیاز :</span>
                  <span>{selectedNews?.newsRate.avg.toFixed(1)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">لایک ها :</span>
                  <span>{selectedNews?.newsRate.count}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش خبر
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                  First Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  Last Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lastName"
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      placeholder="Doe"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="username">
                  Username
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="username"
                  name="username"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="username"
                      placeholder="john.doe.007"
                      invalid={errors.username && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="billing-email">
                  Billing Email
                </Label>
                <Input
                  type="email"
                  id="billing-email"
                  defaultValue={selectedNews.email}
                  placeholder="example@domain.com"
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="status">
                  Status:
                </Label>
                <Select
                  id="status"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={
                    statusOptions[
                      statusOptions.findIndex(
                        (i) => i.value === selectedNews.status
                      )
                    ]
                  }
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="tax-id">
                  Tax ID
                </Label>
                <Input id="tax-id" placeholder="Tax-1234" defaultValue="" />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="contact">
                  Contact
                </Label>
                <Input
                  id="contact"
                  defaultValue={selectedNews.contact}
                  placeholder="+1 609 933 4422"
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="language">
                  language
                </Label>
                <Select
                  id="language"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={languageOptions}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[0]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Select
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col xs={12}>
                <div className="d-flex align-items-center mt-1">
                  <div className="form-switch">
                    <Input
                      type="switch"
                      defaultChecked
                      id="billing-switch"
                      name="billing-switch"
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="billing-switch"
                    >
                      <span className="switch-icon-left">
                        <Check size={14} />
                      </span>
                      <span className="switch-icon-right">
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label
                    className="form-check-label fw-bolder"
                    for="billing-switch"
                  >
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default NewsInfoCard;
