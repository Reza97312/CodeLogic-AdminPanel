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
  name: "",
  lastname: "",
  nationalcode: "",
  profile: "",
};

const PersonalInfo = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    name: yup.string().required(),
    lastname: yup.string().required(),
    nationalcode: yup.string().required(),
    profile: yup.string().required(),
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
        <h5 className="mb-0">اطلاعات هویتی</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-4">
            <Label className="form-label" for="name">
              نام
            </Label>
            <Controller
              id="name"
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="نام خود را وارد کنید..."
                  invalid={errors.name && true}
                  {...field}
                />
              )}
            />
            {errors.name && <FormFeedback>نام خود را وارد کنید</FormFeedback>}
          </Col>
          <Col md="6" className="mb-5">
            <Label className="form-label" for={`lastname`}>
              نام خانوادگی
            </Label>
            <Controller
              control={control}
              id="lastname"
              name="lastname"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="نام خانوادگی خود را وارد کنید..."
                  invalid={errors.lastname && true}
                  {...field}
                />
              )}
            />
            {errors.lastname && (
              <FormFeedback>نام خانوادگی خود را وارد کنید</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="nationalcode">
              کد ملی
            </Label>
            <Controller
              id="nationalcode"
              name="nationalcode"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="کد ملی خود را وارد کنید..."
                  invalid={errors.nationalcode && true}
                  {...field}
                />
              )}
            />
            {errors.nationalcode && (
              <FormFeedback>کد ملی خود را وارد کنید</FormFeedback>
            )}
          </div>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="profile">
              عکس پروفایل
            </Label>
            <Controller
              control={control}
              id="profile"
              name="profile"
              render={({ field }) => (
                <Input
                  type="file"
                  placeholder="عکس خود را انتخاب کنید..."
                  invalid={errors.profile && true}
                  {...field}
                />
              )}
            />
            {errors.profile && (
              <FormFeedback>عکس پروفایل خود را انتخاب کنید</FormFeedback>
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

export default PersonalInfo;
