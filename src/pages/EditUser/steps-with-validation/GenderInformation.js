import { Fragment } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { isObjEmpty } from "@utils";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import { Formik } from "formik";

const Gender = (genderApi) => {
  if (genderApi === true) return "male";
  if (genderApi === false) return "female";
  return "";
};
const birthdayPlaceholder = "تاریخ تولد خود را وارد کنید...";

const GenderInformation = ({ stepper, initialData, handlePayload }) => {
  const convertToUTC = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new DateObject({
        date: dateString,
        format: "YYYY/MM/DD",
        calendar: persian,
        locale: persian_fa,
      });
      return date.toDate().toISOString();
    } catch (err) {
      console.error("Invalid date:", dateString);
      return "";
    }
  };
  const toJalali = (date) => {
    if (!date) return "";
    try {
      return new DateObject({
        date,
      })
        .convert(persian, persian_fa)
        .format("YYYY/MM/DD");
    } catch {
      return "";
    }
  };
  const SignupSchema = yup.object().shape({
    birthDay: yup.string().required("تاریخ تولد الزامی است"),
    gender: yup.string().required("انتخاب جنسیت الزامی است"),
    linkdinProfile: yup.string().required("  لینک خود را وارد کنید   "),
    telegramLink: yup.string().required("   لینک خود را وارد کنید  "),
  });

  return (
    <Fragment>
      <div className="content-header mb-5">
        <h5 className="mb-0">اطلاعات جنسیتی و لینک </h5>
      </div>
      <Formik
        initialValues={{
          birthDay: initialData?.birthDay || "",
          gender: Gender(initialData?.gender || false),
          linkdinProfile: initialData?.linkdinProfile || "",
          telegramLink: initialData?.telegramLink || "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
          handlePayload(values);
          stepper.next();
        }}
      >
        {({ values, errors, touched, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6" className="mb-5">
                <Label className="form-label" for="gender">
                  جنسیت
                </Label>

                <Input
                  value={values.gender}
                  onChange={(e) =>
                    setFieldValue("gender", e.target.value === "true")
                  }
                  type="select"
                  invalid={!!errors.gender && touched.gender}
                >
                  <option value="">جنسیت خود را انتخاب کنید...</option>
                  <option value="true">مرد</option>
                  <option value="false">زن</option>
                </Input>

                {errors.gender && (
                  <FormFeedback>{errors.gender.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-4">
                <Label className="form-label" for="birthday">
                  تاریخ تولد
                </Label>

                <div className={errors.birthDay ? "is-invalid" : ""}>
                  <DatePicker
                    value={toJalali(values.birthDay)}
                    inputClass="form-control"
                    onChange={(d) => {
                      console.log(
                        "birthDay",
                        convertToUTC(d.format("YYYY/MM/DD"))
                      );

                      setFieldValue(
                        "birthDay",
                        convertToUTC(d?.format("YYYY/MM/DD"))
                      );
                    }}
                    calendar={persian}
                    locale={persian_fa}
                  />
                </div>

                {errors.birthDay && (
                  <FormFeedback className="d-block">
                    {errors.birthDay.message}
                  </FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <div className="form-password-toggle col-md-6 mb-5">
                <Label className="form-label" for="linkdinProfile">
                  لینک پروفایل لینکدین
                </Label>

                <Input
                  placeholder="لینک خود را وارد کنید..."
                  value={values.linkdinProfile}
                  onChange={(e) =>
                    setFieldValue("linkdinProfile", e.target.value)
                  }
                  invalid={!!errors.linkdinProfile && touched.linkdinProfile}
                />

                {errors.linkdinProfile && (
                  <FormFeedback>{errors.linkdinProfile.message}</FormFeedback>
                )}
              </div>
              <div className="form-password-toggle col-md-6 mb-5">
                <Label className="form-label" for="telegramLink">
                  لینک تلگرام
                </Label>
                <Input
                  placeholder="لینک خود را انتخاب کنید..."
                  value={values.telegramLink}
                  onChange={(e) =>
                    setFieldValue("telegramLink", e.target.value)
                  }
                  invalid={!!errors.telegramLink && touched.telegramLink}
                />

                {errors.telegram && (
                  <FormFeedback>{errors.telegramLink.message}</FormFeedback>
                )}
              </div>
            </Row>
            <div className="d-flex justify-content-between mt-5">
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
                <span className="align-middle d-sm-inline-block d-none">
                  قبلی
                </span>
              </Button>
              <Button type="submit" color="primary" className="btn-next">
                <span className="align-middle d-sm-inline-block d-none">
                  بعدی
                </span>
                <ArrowRight
                  size={14}
                  className="align-middle ms-sm-25 ms-0"
                ></ArrowRight>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default GenderInformation;
