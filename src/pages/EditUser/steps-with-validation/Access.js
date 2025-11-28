import { Fragment } from "react";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { isObjEmpty } from "@utils";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

const DefValue = (userData, allRolesOptions) => {
  const userRolesOptions = userData.roles
    .map((role) => {
      const roleName = role.roleName.toLowerCase();

      const option = allRolesOptions.find(
        (opt) => opt.value.toLowerCase() === roleName
      );
      return option;
    })
    .filter((option) => option !== undefined);

  const hasRole = (roleName) =>
    userRolesOptions.some(
      (r) => r.value.toLowerCase() === roleName.toLowerCase()
    );

  return {
    teacher: hasRole("teacher") ? "yes" : "no",
    student: hasRole("student") ? "yes" : "no",
    twostep: userData.twoStepAuth === true ? "yes" : "no",
    role: userRolesOptions,
  };
};

const Access = ({ stepper, initialData, allRoles }) => {
  const initialDefValues = DefValue(initialData, allRoles);

  const SignupSchema = yup.object().shape({
    teacher: yup.string().required("وضعیت معلم الزامی است"),
    student: yup.string().required("وضعیت دانشجو الزامی است"),
    twostep: yup.string().required("وضعیت تایید دو مرحله‌ای الزامی است"),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialDefValues,
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next();
    }
  };

  const NoOptionsMessage = (props) => {
    return (
      <div
        {...props.innerProps}
        style={{ textAlign: "center", padding: "8px 12px" }}
      >
        تمام نقش‌های موجود انتخاب شده‌اند
      </div>
    );
  };

  const currentRoles = watch("role", initialDefValues.role);

  const availableOptions = allRoles.filter(
    (option) =>
      !currentRoles.some((selected) => selected.value === option.value)
  );

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
              <FormFeedback>{errors.teacher.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-5">
            <Label className="form-label" for="student">
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
              <FormFeedback>{errors.student.message}</FormFeedback>
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
                  type="select"
                  placeholder="وضعیت خود را وارد کنید..."
                  invalid={errors.twostep && true}
                  {...field}
                >
                  <option value="">وضعیت را انتخاب کنید...</option>
                  <option value="yes">فعال</option>
                  <option value="no">غیرفعال</option>
                </Input>
              )}
            />
            {errors.twostep && (
              <FormFeedback>{errors.twostep.message}</FormFeedback>
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
                  options={availableOptions}
                  classNamePrefix="select"
                  className={`react-select ${errors.role ? "is-invalid" : ""}`}
                  value={field.value}
                  onChange={(selected) => {
                    field.onChange(selected);
                  }}
                  theme={selectThemeColors}
                  placeholder="نقش‌ها را انتخاب کنید..."
                  components={{ NoOptionsMessage }}
                />
              )}
            />

            {errors.role && (
              <FormFeedback className="d-block">
                {errors.role.message}
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
