import { Fragment } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { isObjEmpty } from "@utils";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

const Gender = (genderApi) => {
  if (genderApi === true) return "male";
  if (genderApi === false) return "female";
  return "";
};

const DefValue = (userData) => {
  return {
    birthday: userData.birthDay,
    gender: Gender(userData.gender),
    linkdin: userData.linkdinProfile,
    telegram: userData.telegramLink,
  };
};

const birthdayPlaceholder = "تاریخ تولد خود را وارد کنید...";

const GenderInformation = ({ stepper, initialData }) => {
  const initialDefValues = DefValue(initialData);

  const SignupSchema = yup.object().shape({
    birthday: yup.string().required("تاریخ تولد الزامی است"),
    gender: yup.string().required("انتخاب جنسیت الزامی است"),
    linkdin: yup.string().required("  لینک خود را وارد کنید   "),
    telegram: yup.string().required("   لینک خود را وارد کنید  "),
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
        <h5 className="mb-0">اطلاعات جنسیتی و لینک </h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-4">
            <Label className="form-label" for="birthday">
              تاریخ تولد
            </Label>

            <div className={errors.birthday ? "is-invalid" : ""}>
              <Controller
                control={control}
                id="birthday"
                name="birthday"
                render={({ field }) => (
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    {...field}
                    containerClassName="w-100"
                    inputClass={`form-control w-100 cursor-pointer ${
                      errors.birthday ? "is-invalid" : ""
                    }`}
                    value={
                      field.value
                        ? new DateObject({
                            date: field.value,
                            calendar: persian,
                            locale: persian_fa,
                          })
                        : null
                    }
                    onChange={(date) => {
                      field.onChange(date ? date.toDate().toISOString() : null);
                    }}
                    placeholder={birthdayPlaceholder}
                  />
                )}
              />
            </div>

            {errors.birthday && (
              <FormFeedback className="d-block">
                {errors.birthday.message}
              </FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-5">
            <Label className="form-label" for="gender">
              جنسیت
            </Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Input type="select" {...field} invalid={errors.gender && true}>
                  <option value="">جنسیت خود را انتخاب کنید...</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </Input>
              )}
            />
            {errors.gender && (
              <FormFeedback>{errors.gender.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="linkdin">
              لینک پروفایل لینکدین
            </Label>
            <Controller
              id="linkdin"
              name="linkdin"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="لینک خود را وارد کنید..."
                  invalid={errors.linkdin && true}
                  {...field}
                />
              )}
            />
            {errors.linkdin && (
              <FormFeedback>{errors.linkdin.message}</FormFeedback>
            )}
          </div>
          <div className="form-password-toggle col-md-6 mb-5">
            <Label className="form-label" for="telegram">
              لینک تلگرام
            </Label>
            <Controller
              control={control}
              id="telegram"
              name="telegram"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="لینک خود را انتخاب کنید..."
                  invalid={errors.telegram && true}
                  {...field}
                />
              )}
            />
            {errors.telegram && (
              <FormFeedback>{errors.telegram.message}</FormFeedback>
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

export default GenderInformation;
