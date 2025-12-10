import { Fragment } from "react";
import { isObjEmpty } from "@utils";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import { Formik } from "formik";

const PersonalInfo = ({ stepper, initialData, handlePayload }) => {
  const SignupSchema = yup.object().shape({
    fName: yup.string().required("   نام خود را وارد کنید "),
    lName: yup.string().required("   نام خانوادگی خود را وارد کنید  "),
    nationalCode: yup
      .string()
      .required("   کد ملی خود را وارد کنید  ")
      .matches(/^[0-9]{10}$/, "کد ملی نامعتبر است"),
    currentPictureAddress: yup.string().url("لینک نامعتبر است"),
  });

  return (
    <Fragment>
      <div className="content-header mb-5">
        <h5 className="mb-0">اطلاعات هویتی</h5>
      </div>
      <Formik
        initialValues={{
          fName: initialData?.fName || "",
          lName: initialData?.lName || "",
          nationalCode: initialData?.nationalCode || "",
          currentPictureAddress: initialData?.currentPictureAddress || "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(vals) => {
          console.log(vals);
          handlePayload(vals);
          stepper.next();
        }}
      >
        {({ values, errors, touched, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6" className="mb-4">
                <Label className="form-label" for="fName">
                  نام
                </Label>
                <Input
                  value={values.fName}
                  onChange={(e) => setFieldValue("fName", e.target.value)}
                  invalid={!!errors.fName && touched.fName}
                  placeholder="نام خود را وارد کنید..."
                />
                {errors.fName && (
                  <FormFeedback>{errors.fName.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-5">
                <Label className="form-label" for="lName">
                  نام خانوادگی
                </Label>

                <Input
                  placeholder="نام خانوادگی خود را وارد کنید..."
                  value={values.lName}
                  onChange={(e) => setFieldValue("lName", e.target.value)}
                  invalid={!!errors.lName && touched.lName}
                />
                {errors.lName && (
                  <FormFeedback>{errors.lName.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <div className="form-password-toggle col-md-6 mb-5">
                <Label className="form-label" for="nationalCode">
                  کد ملی
                </Label>
                <Input
                  placeholder="کد ملی خود را وارد کنید..."
                  value={values.nationalCode}
                  onChange={(e) =>
                    setFieldValue("nationalCode", e.target.value)
                  }
                  invalid={!!errors.nationalCode && touched.nationalCode}
                />
                {errors.nationalCode && (
                  <FormFeedback>{errors.nationalCode.message}</FormFeedback>
                )}
              </div>
              <div className="form-password-toggle col-md-6 mb-1">
                <Label className="form-label" for="profile">
                  لینک عکس پروفایل
                </Label>
                <Input
                  type="text"
                  placeholder="لینک عکس را وارد کنید..."
                  value={values.currentPictureAddress}
                  onChange={(e) => {
                    setFieldValue("currentPictureAddress", e.target.value);
                  }}
                  invalid={
                    !!errors.currentPictureAddress &&
                    touched.currentPictureAddress
                  }
                />

                {values.currentPictureAddress && (
                  <div className="mt-2">
                    <img
                      src={values.currentPictureAddress}
                      alt="preview"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                )}

                {errors.currentPictureAddress && (
                  <FormFeedback className="d-block">
                    {errors.currentPictureAddress}
                  </FormFeedback>
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

export default PersonalInfo;
