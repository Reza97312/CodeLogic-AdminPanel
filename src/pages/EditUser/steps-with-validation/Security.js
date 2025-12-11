import { Fragment } from "react";
import { isObjEmpty } from "@utils";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import { Formik } from "formik";

const Security = ({ stepper, initialData, handlePayload }) => {
  const SignupSchema = yup.object().shape({
    userName: yup.string().required(),
    phoneNumber: yup.string().required(),
    gmail: yup.string().email().required(),
    recoveryEmail: yup.string().required().email(),
  });

  return (
    <Fragment>
      <div className="content-header mb-5">
        <h5 className="mb-0">اطلاعات امنیتی</h5>
      </div>
      <Formik
        initialValues={{
          insertDate: initialData?.insertDate,
          active: initialData?.active,
          isDelete: initialData?.isDelete,
          id: initialData?.id,
          userName: initialData?.userName || "",
          gmail: initialData?.gmail || "",
          phoneNumber: initialData?.phoneNumber || "",
          recoveryEmail: initialData?.recoveryEmail || "",
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
              <Col md="6" className="mb-4">
                <Label className="form-label" for="userName">
                  نام کاربری
                </Label>
                <Input
                  value={values.userName}
                  placeholder="نام کاربری خود را وارد کنید..."
                  onChange={(e) => setFieldValue("userName", e.target.value)}
                  invalid={!!errors.userName && touched.userName}
                />
                {errors.userName && (
                  <FormFeedback>نام کاربری خود را وارد کنید</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-5">
                <Label className="form-label" for="email">
                  ایمیل
                </Label>
                <Input
                  type="email"
                  placeholder="user@email.com"
                  value={values.gmail}
                  onChange={(e) => setFieldValue("gmail", e.target.value)}
                  invalid={!!errors.gmail && touched.gmail}
                />

                {errors.gmail && (
                  <FormFeedback>ایمیل خود را وارد کنید</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <div className="form-password-toggle col-md-6 mb-5">
                <Label className="form-label" for="phoneNumber">
                  شماره تلفن
                </Label>
                <Input
                  placeholder="شماره تلفن خود را وارد کنید..."
                  value={values.phoneNumber}
                  onChange={(e) => setFieldValue("phonenumber", e.target.value)}
                  invalid={!!errors.phoneNumber && touched.phoneNumber}
                />
                {errors.phoneNumber && (
                  <FormFeedback>شماره تلفن خود را وارد کنید</FormFeedback>
                )}
              </div>

              <div className="form-password-toggle col-md-6 mb-5">
                <Label className="form-label" for="recoveryEmail">
                  بازگردانی ایمیل
                </Label>
                <Input
                  type="email"
                  placeholder="user@email.com"
                  value={values.recoveryEmail}
                  onChange={(e) =>
                    setFieldValue("recoveryEmail", e.target.value)
                  }
                  invalid={!!errors.recoveryEmail && touched.recoveryEmail}
                />
                {errors.recoveryEmail && (
                  <FormFeedback>ایمیل خود را وارد کنید</FormFeedback>
                )}
              </div>
            </Row>
            <div className="d-flex justify-content-between mt-5">
              <Button
                onClick={() => stepper.previous()}
                color="secondary"
                className="btn-prev"
                outline
                disabled
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

export default Security;
