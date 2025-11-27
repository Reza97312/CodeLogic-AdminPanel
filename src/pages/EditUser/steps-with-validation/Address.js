import { Fragment } from "react";
import { isObjEmpty } from "@utils";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

const DefValue = (userData) => {
  return {
    adress: userData.homeAdderess,
    about: userData.userAbout,
    width: userData.latitude,
    height: userData.longitude,
  };
};

const Address = ({ stepper, initialData }) => {
  const initialDefValues = DefValue(initialData);

  const SignupSchema = yup.object().shape({
    adress: yup.string().required(),
    about: yup.string().required(),
    width: yup.string().required(),
    height: yup.string().required(),
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
        <h5 className="mb-0">اطلاعات محل سکونت</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-4">
            <Label className="form-label" for="adress">
              آدرس
            </Label>
            <Controller
              id="adress"
              name="adress"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="آدرس خود را وارد کنید..."
                  invalid={errors.adress && true}
                  {...field}
                />
              )}
            />
            {errors.adress && (
              <FormFeedback>آدرس خود را وارد کنید</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-5">
            <Label className="form-label" for="about">
              درباره کاربر
            </Label>
            <Controller
              control={control}
              id="about"
              name="about"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="اطلاعات خود را وارد کنید..."
                  invalid={errors.about && true}
                  {...field}
                />
              )}
            />
            {errors.about && (
              <FormFeedback>اطلاعات خود را وارد کنید</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="width">
              عرض جغرافیایی
            </Label>
            <Controller
              id="width"
              name="width"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="عرض جغرافیایی خود را وارد کنید..."
                  invalid={errors.width && true}
                  {...field}
                />
              )}
            />
            {errors.width && (
              <FormFeedback>
                عرض جغرافیایی محل سکونت خود را وارد کنید
              </FormFeedback>
            )}
          </div>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="height">
              طول جغرافیایی
            </Label>
            <Controller
              control={control}
              id="height"
              name="height"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="طول جغرافیایی خود را انتخاب کنید..."
                  invalid={errors.height && true}
                  {...field}
                />
              )}
            />
            {errors.height && (
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
