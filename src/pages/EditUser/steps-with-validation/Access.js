import { Fragment } from "react";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import * as yup from "yup";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import { Formik } from "formik";

const Access = ({ stepper, initialData, allRoles, handlePayload }) => {
  const SignupSchema = yup.object().shape({
    isTecher: yup.string().required("وضعیت معلم الزامی است"),
    isStudent: yup.string().required("وضعیت دانشجو الزامی است"),
    twoStepAuth: yup.string().required("وضعیت تایید دو مرحله‌ای الزامی است"),
  });

  const initialRoles = allRoles.filter((opt) =>
    initialData?.roles.some(
      (roleName) => roleName.roleName.toLowerCase() === opt.label.toLowerCase()
    )
  );
  return (
    <Fragment>
      <div className="content-header mb-5">
        <h5 className="mb-0">دسترسی ها</h5>
      </div>

      <Formik
        initialValues={{
          isTecher: initialData?.isTecher || "",
          isStudent: initialData?.isStudent || "",
          twoStepAuth: initialData?.twoStepAuth || "",
          userRoles: initialRoles,
        }}
        validationSchema={SignupSchema}
        onSubmit={(vals) => {
          const payload = {
            isTecher: vals.isTecher,
            isStudent: vals.isStudent,
            twoStepAuth: vals.twoStepAuth,
            userRoles: {
              create: (vals.userRoles || []).map((r) => ({ roleId: r.value })),
            },
          };

          handlePayload(payload);
          stepper.next();
        }}
      >
        {({ values, errors, touched, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6" className="mb-4">
                <Label className="form-label" for="isTecher">
                  وضعیت معلم
                </Label>
                <Input
                  type="select"
                  value={values.isTecher}
                  onChange={(e) =>
                    setFieldValue("isTecher", e.target.value === "yes")
                  }
                  invalid={!!errors.isTecher && touched.isTecher}
                >
                  <option value="">انتخاب کنید...</option>
                  <option value="true">بله</option>
                  <option value="false">خیر</option>
                </Input>
                {errors.isTecher && touched.isTecher && (
                  <FormFeedback>{errors.isTecher}</FormFeedback>
                )}
              </Col>

              <Col md="6" className="mb-5">
                <Label className="form-label" for="isStudent">
                  وضعیت دانشجو
                </Label>
                <Input
                  type="select"
                  value={values.isStudent}
                  onChange={(e) =>
                    setFieldValue("isStudent", e.target.value === "true")
                  }
                  invalid={!!errors.isStudent && touched.isStudent}
                >
                  <option value="">انتخاب کنید...</option>
                  <option value="true">بله</option>
                  <option value="false">خیر</option>
                </Input>
                {errors.isStudent && touched.isStudent && (
                  <FormFeedback>{errors.isStudent}</FormFeedback>
                )}
              </Col>
            </Row>

            <Row>
              <Col md="6" className="mb-5">
                <Label className="form-label" for="twoStepAuth">
                  تایید دو مرحله‌ای
                </Label>
                <Input
                  type="select"
                  value={values.twoStepAuth}
                  onChange={(e) =>
                    setFieldValue("twoStepAuth", e.target.value === "true")
                  }
                  invalid={!!errors.twoStepAuth && touched.twoStepAuth}
                >
                  <option value="">انتخاب کنید...</option>
                  <option value="true">فعال</option>
                  <option value="false">غیرفعال</option>
                </Input>
                {errors.twoStepAuth && touched.twoStepAuth && (
                  <FormFeedback>{errors.twoStepAuth}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-5">
                <Label className="form-label" for="userRoles">
                  نقش کاربر
                </Label>
                <Select
                  isMulti
                  options={allRoles}
                  value={values.userRoles}
                  onChange={(selected) => setFieldValue("userRoles", selected)}
                  theme={selectThemeColors}
                  className={`react-select ${
                    errors.userRoles && touched.userRoles ? "is-invalid" : ""
                  }`}
                  placeholder="نقش‌ها را انتخاب کنید..."
                />
                {errors.userRoles && touched.userRoles && (
                  <FormFeedback className="d-block">
                    {errors.userRoles}
                  </FormFeedback>
                )}
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-5">
              <Button
                color="secondary"
                className="btn-prev"
                outline
                onClick={() => stepper.previous()}
              >
                <ArrowLeft size={14} />
                <span className="align-middle d-sm-inline-block d-none">
                  قبلی
                </span>
              </Button>

              <Button type="submit" color="primary" className="btn-next">
                <span className="align-middle d-sm-inline-block d-none">
                  بعدی
                </span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default Access;
