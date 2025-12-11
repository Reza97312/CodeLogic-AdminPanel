import { Fragment } from "react";
import { isObjEmpty } from "@utils";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import { Formik } from "formik";

const Address = ({ stepper, initialData, handlePayload }) => {
  const SignupSchema = yup.object().shape({
    homeAdderess: yup.string().required(),
    userAbout: yup.string().required(),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
  });

  return (
    <Fragment>
      <div className="content-header mb-5">
        <h5 className="mb-0">اطلاعات محل سکونت</h5>
      </div>
      <Formik
        initialValues={{
          homeAdderess: initialData?.homeAdderess || "",
          userAbout: initialData?.userAbout || "",
          latitude: initialData?.latitude || "",
          longitude: initialData?.longitude || "",
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
                <Label className="form-label" for="homeAdderess">
                  آدرس
                </Label>

                <Input
                  placeholder="آدرس خود را وارد کنید..."
                  value={values.homeAdderess}
                  onChange={(e) =>
                    setFieldValue("homeAdderess", e.target.value)
                  }
                  invalid={!!errors.homeAdderess && touched.homeAdderess}
                />

                {errors.homeAdderess && (
                  <FormFeedback>آدرس خود را وارد کنید</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-5">
                <Label className="form-label" for="userAbout">
                  درباره کاربر
                </Label>
                <Input
                  placeholder="اطلاعات خود را وارد کنید..."
                  value={values.userAbout}
                  onChange={(e) => setFieldValue("userAbout", e.target.value)}
                  invalid={!!errors.userAbout && touched.userAbout}
                />

                {errors.userAbout && (
                  <FormFeedback>اطلاعات خود را وارد کنید</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <div className="form-password-toggle col-md-6 mb-5">
                <Label className="form-label" for="latitude">
                  عرض جغرافیایی
                </Label>
                <Input
                  placeholder="عرض جغرافیایی خود را وارد کنید..."
                  value={values.latitude}
                  onChange={(e) => setFieldValue("latitude", e.target.value)}
                  invalid={!!errors.latitude && touched.latitude}
                />

                {errors.latitude && (
                  <FormFeedback>
                    عرض جغرافیایی محل سکونت خود را وارد کنید
                  </FormFeedback>
                )}
              </div>
              <div className="form-password-toggle col-md-6 mb-5">
                <Label className="form-label" for="longitude">
                  طول جغرافیایی
                </Label>
                <Input
                  placeholder="طول جغرافیایی خود را انتخاب کنید..."
                  value={values.longitude}
                  onChange={(e) => setFieldValue("longitude", e.target.value)}
                  invalid={!!errors.longitude && touched.longitude}
                />

                {errors.longitude && (
                  <FormFeedback>
                    طول جغرافیایی محل سکونت خود را وارد کنید
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

export default Address;
