// ** React Imports
import { Fragment, useState } from "react";
import Select from "react-select";
import { selectThemeColors } from "@utils";
// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

const defaultValues = {
  teacher: "",
  student: "",
  twostep: "",
  role: [],
};

const Access = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    teacher: yup.string().required(),
    student: yup.string().required(),
    twostep: yup.string().required(),
    role: yup.array().min(1),
  });

  // ** Hooks

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next();
    }
  };

  const allRolesOptions = [
    { value: "employee.admin", label: "Employee.Admin" },
    { value: "administrator", label: "Administrator" },
    { value: "student", label: "Student" },
    { value: "editor", label: "Editor" },
    { value: "contributor", label: "Contributor" },
  ];

  const [selectedRoles, setSelectedRoles] = useState([]);
  return (
    <Fragment>
      <div className="content-header mb-5">
        <h5 className="mb-0">دسترسی ها </h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-4">
            <Label className="form-label" for="teacher">
              وضعیت معلم
            </Label>
            <Controller
              id="teacher"
              name="teacher"
              control={control}
              render={({ field }) => (
                <Input
                  type="select"
                  {...field}
                  invalid={errors.teacher && true}
                >
                  <option value="">وضعیت خود را انتخاب کنید...</option>
                  <option value="yes">بله</option>
                  <option value="no">خیر</option>
                </Input>
              )}
            />
            {errors.teacher && (
              <FormFeedback>وضعیت معلم را انتخاب کنید</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-5">
            <Label className="form-label" for={`student`}>
              وضعیت دانشجویی
            </Label>
            <Controller
              control={control}
              id="student"
              name="student"
              render={({ field }) => (
                <Input
                  type="select"
                  {...field}
                  invalid={errors.student && true}
                >
                  <option value="">وضعیت خود را انتخاب کنید...</option>
                  <option value="yes">بله</option>
                  <option value="no">خیر</option>
                </Input>
              )}
            />
            {errors.student && (
              <FormFeedback>وضعیت دانشجو را انتخاب کنید</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="twostep">
              وضعیت تایید دو مرحله ای
            </Label>
            <Controller
              id="twostep"
              name="twostep"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="وضعیت خود را وارد کنید..."
                  invalid={errors.twostep && true}
                  {...field}
                />
              )}
            />
            {errors.twostep && (
              <FormFeedback>
                وضعیت تایید دو مرحله ای را انتخاب کنید
              </FormFeedback>
            )}
          </div>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="role">
              نقش کاربر
            </Label>

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={allRolesOptions}
                  classNamePrefix="select"
                  className={`react-select ${errors.role ? "is-invalid" : ""}`}
                  value={field.value}
                  onChange={(selected) => {
                    field.onChange(selected);
                  }}
                  theme={selectThemeColors}
                  placeholder="نقش‌ها را انتخاب کنید..."
                />
              )}
            />

            {errors.role && (
              <FormFeedback className="d-block">
                نقش کاربر را انتخاب کنید
              </FormFeedback>
            )}
          </div>
        </Row>
        <div className="d-flex justify-content-between mt-5">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
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

export default Access;
