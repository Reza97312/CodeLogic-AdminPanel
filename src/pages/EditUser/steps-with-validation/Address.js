// ** React Imports
import { Fragment } from "react";

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
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const Address = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref(`password`), null], "Passwords must match"),
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

  return (
    <Fragment>
      <div className="content-header mb-5">
        <h5 className="mb-0">اطلاعات محل سکونت</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-4">
            <Label className="form-label" for="username">
              آدرس
            </Label>
            <Controller
              id="username"
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="آدرس خود را وارد کنید..."
                  invalid={errors.username && true}
                  {...field}
                />
              )}
            />
            {errors.username && (
              <FormFeedback>{errors.username.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-5">
            <Label className="form-label" for={`email`}>
              درباره کاربر
            </Label>
            <Controller
              control={control}
              id="email"
              name="email"
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="اطلاعات خود را وارد کنید..."
                  invalid={errors.email && true}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <FormFeedback>{errors.email.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="password">
              عرض جغرافیایی
            </Label>
            <Controller
              id="password"
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="عرض جغرافیایی خود را وارد کنید..."
                  invalid={errors.password && true}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <FormFeedback>{errors.password.message}</FormFeedback>
            )}
          </div>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="confirmPassword">
              طول جغرافیایی
            </Label>
            <Controller
              control={control}
              id="confirmPassword"
              name="confirmPassword"
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="طول جغرافیایی خود را انتخاب کنید..."
                  invalid={errors.confirmPassword && true}
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <FormFeedback>{errors.confirmPassword.message}</FormFeedback>
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

export default Address;
