import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ProgressBar,
  Image,
} from "react-bootstrap";

import { Formik } from "formik";
import * as Yup from "yup";

import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useLocation, useNavigate } from "react-router-dom";
import { EditCourse } from "../../../core/services/api/put/Courses/EditCourse";
import { CreateCourse } from "../../../core/services/api/post/Courses/CreateCourse";
import { GetCreateCourse } from "../../../core/services/api/get/Courses/GetCreateCourse";
const convertToUTC = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new DateObject({
      date: dateString,
      format: "YYYY/MM/DD",
      calendar: persian,
      locale: persian_fa,
    });
    return date.toDate().toISOString();
  } catch (err) {
    console.error("Invalid date:", dateString);
    return "";
  }
};
const toJalali = (date) => {
  if (!date) return "";
  try {
    return new DateObject({
      date,
    })
      .convert(persian, persian_fa)
      .format("YYYY/MM/DD");
  } catch {
    return "";
  }
};
const Step1Schema = Yup.object().shape({
  Title: Yup.string().required("نام دوره لازم است"),
  GoogleTitle: Yup.string().required("نام گوگل دوره لازم است"),
  Describe: Yup.string().required("توضیحات لازم است"),
  MiniDescribe: Yup.string().required("توضیح کوتاه لازم است"),
});

const Step2Schema = Yup.object().shape({
  StartTime: Yup.string().required("تاریخ شروع لازم است"),
  EndTime: Yup.string().required("تاریخ پایان لازم است"),
  TeacherId: Yup.number().required("انتخاب استاد  لازم است"),
});

const Step3Schema = Yup.object().shape({
  Capacity: Yup.number().required("ظرفیت لازم است"),
  Cost: Yup.number().required("قیمت لازم است"),
  CourseLvlId: Yup.number().required("سطح دوره لازم است"),
});

const Step4Schema = Yup.object().shape({
  ImageAddress: Yup.mixed(),
});
const EmptySchema = Yup.object().shape({});
const CourseWizardFormik = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.isEdit || false;
  const firstData = location.state?.updateData;
  const [step, setStep] = useState(1);
  const [LevelName, setLevelName] = useState(null);

  const totalSteps = 5;
  const progress = Math.round(((step - 1) / (totalSteps - 1)) * 100);

  const [photoPreview, setPhotoPreview] = useState(null);

  const { data: CreateData = {}, isPending: pendingCreateData } = useQuery({
    queryKey: ["GETCREATE"],
    queryFn: () => GetCreateCourse(),
  });
  const { mutate: Create, isPending } = useMutation({
    mutationKey: ["CREATECOURSE"],
    mutationFn: (formData) => CreateCourse(formData),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/courses-management");
    },
    onError: (err) => toast.error(err.response?.data?.message),
  });
  const { mutate: Edit } = useMutation({
    mutationKey: ["UPDATECOURSE"],
    mutationFn: (formData) => EditCourse(formData),
    onSuccess: (data) => {
      toast.success("دوره با موفقیت ویرایش شد 🤩");
      navigate(`/courses/view/${firstData.courseId}`);
    },
    onError: (err) => toast.error(err.response?.data?.message),
  });
  const currentSchema =
    step === 1
      ? Step1Schema
      : step === 2
      ? Step2Schema
      : step === 3
      ? Step3Schema
      : step === 4
      ? Step4Schema
      : EmptySchema;

  return (
    <Container className="py-2">
      <Row className="justify-content-center">
        <Col md={9}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">
                فرم دوره — مرحله {step} از {totalSteps}
              </h4>
              <ProgressBar now={progress} className="mb-3" />

              <Formik
                initialValues={{
                  Title: isEdit ? firstData.title : "",
                  GoogleTitle: isEdit ? firstData.googleTitle : "",
                  Describe: isEdit ? firstData.describe : "",
                  MiniDescribe: isEdit ? firstData.miniDescribe : "",
                  StartTime: isEdit ? toJalali(firstData.startTime) : "",
                  TeacherId: isEdit ? firstData.teacherId : "",
                  EndTime: isEdit ? toJalali(firstData.endTime) : "",
                  Capacity: isEdit ? firstData.capacity : 0,
                  Cost: isEdit ? firstData.cost : 0,
                  CourseLvlId: isEdit ? firstData.courseLvlId : "",
                  ImageAddress: isEdit ? firstData.imageAddress : "",
                }}
                validationSchema={currentSchema}
                enableReinitialize={false}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values) => {
                  if (step < totalSteps) {
                    setStep(step + 1);
                    return;
                  }

                  const fd = new FormData();
                  {
                    isEdit ? fd.append("Id", firstData.courseId) : "";
                  }
                  fd.append("Title", values.Title);
                  fd.append("GoogleTitle", values.GoogleTitle);
                  fd.append("Describe", values.Describe);
                  fd.append("MiniDescribe", values.MiniDescribe);
                  fd.append("StartTime", convertToUTC(values.StartTime));
                  fd.append("EndTime", convertToUTC(values.EndTime));

                  fd.append("Capacity", Number(values.Capacity));
                  fd.append("Cost", Number(values.Cost));
                  fd.append("CourseLvlId", Number(values.CourseLvlId));
                  fd.append("TeacherId", Number(values.TeacherId));

                  fd.append("ImageAddress", values.ImageAddress);

                  {
                    isEdit ? Edit(fd) : Create(fd);
                  }
                }}
              >
                {({ values, errors, setFieldValue, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>نام دوره</Form.Label>
                          <Form.Control
                            value={values.Title}
                            onChange={(e) =>
                              setFieldValue("Title", e.target.value)
                            }
                            isInvalid={!!errors.Title}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Title}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>نام گوگل دوره</Form.Label>
                          <Form.Control
                            value={values.GoogleTitle}
                            onChange={(e) =>
                              setFieldValue("GoogleTitle", e.target.value)
                            }
                            isInvalid={!!errors.GoogleTitle}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.GoogleTitle}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>توضیحات</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            value={values.Describe}
                            onChange={(e) =>
                              setFieldValue("Describe", e.target.value)
                            }
                            isInvalid={!!errors.Describe}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Describe}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>توضیح کوتاه</Form.Label>
                          <Form.Control
                            value={values.MiniDescribe}
                            onChange={(e) =>
                              setFieldValue("MiniDescribe", e.target.value)
                            }
                            isInvalid={!!errors.MiniDescribe}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.MiniDescribe}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <Row>
                          <Col xl="4" md="6" xs="12">
                            <Form.Group className="mb-3">
                              <Form.Label>تاریخ شروع</Form.Label>
                              <DatePicker
                                value={values.StartTime}
                                onChange={(d) => {
                                  console.log("date", d.format("YYYY/MM/DD"));

                                  setFieldValue(
                                    "StartTime",
                                    d?.format("YYYY/MM/DD")
                                  );
                                }}
                                calendar={persian}
                                locale={persian_fa}
                                inputClass="form-control"
                              />
                              <div className="text-danger small">
                                {errors.StartTime}
                              </div>
                            </Form.Group>
                          </Col>
                          <Col xl="4" md="6" xs="12">
                            <Form.Group>
                              <Form.Label>تاریخ پایان</Form.Label>
                              <DatePicker
                                value={values.EndTime}
                                onChange={(d) =>
                                  setFieldValue(
                                    "EndTime",
                                    d?.format("YYYY/MM/DD")
                                  )
                                }
                                calendar={persian}
                                locale={persian_fa}
                                inputClass="form-control"
                              />
                              <div className="text-danger small">
                                {errors.EndTime}
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl="4" md="6" xs="12">
                            <Form.Group>
                              <Form.Label>انتخاب استاد</Form.Label>
                              <Form.Select
                                value={values.TeacherId}
                                onChange={(e) =>
                                  setFieldValue(
                                    "TeacherId",
                                    parseInt(e.target.value)
                                  )
                                }
                                isInvalid={!!errors.TeacherId}
                              >
                                {pendingCreateData ? (
                                  <option>درحال بارگزاری...</option>
                                ) : CreateData?.teachers?.length > 0 ? (
                                  CreateData.teachers.map((item, index) => (
                                    <option key={index} value={item.teacherId}>
                                      {item.fullName}
                                    </option>
                                  ))
                                ) : (
                                  <option>استادی یافت نشد</option>
                                )}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.TeacherId}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>ظرفیت دوره</Form.Label>
                          <Form.Control
                            type="number"
                            value={values.Capacity}
                            onChange={(e) =>
                              setFieldValue("Capacity", e.target.value)
                            }
                            isInvalid={!!errors.Capacity}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Capacity}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>قیمت دوره</Form.Label>
                          <Form.Control
                            type="number"
                            value={values.Cost}
                            onChange={(e) =>
                              setFieldValue("Cost", e.target.value)
                            }
                            isInvalid={!!errors.Cost}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Cost}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>سطح دوره</Form.Label>
                          <Form.Select
                            value={values.CourseLvlId}
                            onChange={(e) => {
                              setFieldValue(
                                "CourseLvlId",
                                parseInt(e.target.value)
                              );
                            }}
                            isInvalid={!!errors.CourseLvlId}
                          >
                            <option value="">انتخاب کنید...</option>
                            {pendingCreateData ? (
                              <option>درحال بارگزاری...</option>
                            ) : CreateData?.courseLevelDtos?.length > 0 ? (
                              CreateData.courseLevelDtos.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.levelName}
                                </option>
                              ))
                            ) : (
                              <option>استادی یافت نشد</option>
                            )}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.CourseLvlId}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <h5 className="mb-3 text-center">انتخاب عکس دوره</h5>
                        <Form.Group className="text-center">
                          <div className="mb-3">
                            {values.ImageAddress ? (
                              <Image
                                src={photoPreview || values.ImageAddress || ""}
                                roundedCircle
                                style={{
                                  width: 200,
                                  height: 200,
                                  objectFit: "cover",
                                  border: "3px solid #ddd",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 150,
                                  height: 150,
                                  borderRadius: "50%",
                                  background: "#f0f0f0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: "3px solid #ddd",
                                  margin: "0 auto",
                                }}
                              >
                                بدون عکس
                              </div>
                            )}
                          </div>

                          {/* <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setFieldValue("ImageAddress", file);

                              setPhotoPreview(URL.createObjectURL(file));
                            }}
                            isInvalid={!!errors.ImageAddress}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.ImageAddress}
                          </Form.Control.Feedback> */}
                        </Form.Group>
                      </>
                    )}

                    {step === 5 && (
                      <>
                        <h5 className="text-center mb-1">
                          پیش‌نمایش نهایی دوره
                        </h5>
                        <Card className="p-3 shadow-sm text-center">
                          <div className="mb-2">
                            {values.ImageAddress !== "" ? (
                              <Image
                                src={photoPreview || values.ImageAddress || ""}
                                roundedCircle
                                style={{
                                  width: 200,
                                  height: 200,
                                  objectFit: "cover",
                                  border: "3px solid #ddd",
                                  margin: "0 auto",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 150,
                                  height: 150,
                                  borderRadius: "50%",
                                  background: "#f0f0f0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: "3px solid #ddd",
                                  margin: "0 auto",
                                }}
                              >
                                بدون عکس
                              </div>
                            )}
                          </div>

                          <p>
                            <strong>نام دوره: </strong> {values.Title}
                          </p>
                          <p>
                            <strong>توضیحات: </strong> {values.Describe}
                          </p>
                          <p>
                            <strong>توضیح کوتاه: </strong> {values.MiniDescribe}
                          </p>
                          <p>
                            <strong>تاریخ شروع: </strong> {values.StartTime}
                          </p>
                          <p>
                            <strong>تاریخ پایان: </strong> {values.EndTime}
                          </p>
                          <p>
                            <strong>ظرفیت: </strong> {values.Capacity}
                          </p>
                          <p>
                            <strong>قیمت: </strong> {values.Cost}
                          </p>
                          <p>
                            <strong>سطح دوره: </strong> {LevelName}
                          </p>
                        </Card>
                      </>
                    )}

                    <div className="d-flex justify-content-between mt-4">
                      <Button
                        variant="secondary"
                        disabled={step === 1 || isPending}
                        onClick={() => setStep(step - 1)}
                      >
                        قبلی
                      </Button>

                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isPending}
                      >
                        {step === totalSteps
                          ? isPending
                            ? "در حال ارسال..."
                            : "ثبت نهایی"
                          : "مرحله بعد"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseWizardFormik;
