import { Fragment } from "react";
import { isObjEmpty } from "@utils";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

const DefValue = (userData) => {
  return {
    name: userData.fName,
    lastname: userData.lName,
    nationalcode: userData.nationalCode,
    profile: userData.currentPictureAddress,
  };
};

const PersonalInfo = ({ stepper, initialData }) => {
  const initialDefValues = DefValue(initialData);

  const SignupSchema = yup.object().shape({
    name: yup.string().required("   نام خود را وارد کنید "),
    lastname: yup.string().required("   نام خانوادگی خود را وارد کنید  "),
    nationalcode: yup
      .string()
      .required("   کد ملی خود را وارد کنید  ")
      .matches(/^[0-9]{10}$/, "کد ملی نامعتبر است"),
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
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </Col>
          <Col md="6" className="mb-5">
            <Label className="form-label" for="lastname">
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
              <FormFeedback>{errors.lastname.message}</FormFeedback>
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
              <FormFeedback>{errors.nationalcode.message}</FormFeedback>
            )}
          </div>
          <div className="form-password-toggle col-md-6 mb-1">
            <Label className="form-label" for="profile">
              عکس پروفایل
            </Label>
            <Controller
              control={control}
              id="profile"
              name="profile"
              render={({ field: { value, onChange, ...field } }) => (
                <Fragment>
                  <Input
                    type="file"
                    placeholder="عکس خود را انتخاب کنید..."
                    invalid={errors.profile && true}
                    onChange={(e) => onChange(e.target.files[0])}
                    {...field}
                  />

                  {initialData.currentPictureAddress &&
                    typeof initialData.currentPictureAddress === "string" && (
                      <small className="text-muted mt-1 d-block">
                        عکس فعلی:{" "}
                        {initialData.currentPictureAddress.substring(0, 30)}...
                      </small>
                    )}
                </Fragment>
              )}
            />
            {errors.profile && (
              <FormFeedback>{errors.profile.message}</FormFeedback>
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

export default PersonalInfo;
