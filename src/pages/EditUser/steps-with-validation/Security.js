import { Fragment } from "react";
import { isObjEmpty } from "@utils";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
const DefValue = (userData) => {
  return {
    username: userData.userName,
    email: userData.gmail,
    phonenumber: userData.phoneNumber,
    emailrecovery: userData.recoveryEmail,
  };
};

const Security = ({ stepper, initialData }) => {
  const initialDefValues = DefValue(initialData);

  const SignupSchema = yup.object().shape({
    username: yup.string().required(),
    phonenumber: yup.string().required(),
    email: yup.string().email().required(),
    emailrecovery: yup.string().required().email(),
  });

  const {
    control,
    handleSubmit,
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

  return (
    <Fragment>
      <div className="content-header mb-5">
        <h5 className="mb-0">اطلاعات امنیتی</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-4">
            <Label className="form-label" for="username">
              نام کاربری
            </Label>
            <Controller
              id="username"
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="نام کاربری خود را وارد کنید..."
                  invalid={errors.username && true}
                  {...field}
                />
              )}
            />
            {errors.username && (
              <FormFeedback>نام کاربری خود را وارد کنید</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-5">
            <Label className="form-label" for="email">
              ایمیل
            </Label>
            <Controller
              control={control}
              id="email"
              name="email"
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="user@email.com"
                  invalid={errors.email && true}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <FormFeedback>ایمیل خود را وارد کنید</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="phonenumber">
              شماره تلفن
            </Label>
            <Controller
              id="phonenumber"
              name="phonenumber"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="شماره تلفن خود را وارد کنید..."
                  invalid={errors.phonenumber && true}
                  {...field}
                />
              )}
            />
            {errors.phonenumber && (
              <FormFeedback>شماره تلفن خود را وارد کنید</FormFeedback>
            )}
          </div>

          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="emailrecovery">
              بازگردانی ایمیل
            </Label>
            <Controller
              control={control}
              id="emailrecovery"
              name="emailrecovery"
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="user@email.com"
                  invalid={errors.emailrecovery && true}
                  {...field}
                />
              )}
            />
            {errors.emailrecovery && (
              <FormFeedback>ایمیل خود را وارد کنید</FormFeedback>
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

export default Security;
