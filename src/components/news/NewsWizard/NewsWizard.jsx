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
import DOMPurify from "dompurify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CreateNews } from "../../../core/services/api/post/News/CreateNew";
import { useNavigate, useParams } from "react-router-dom";
import { editNews } from "../../../core/services/api/put/News/editNews";
import getListNewsCategory from "../../../core/services/api/get/News/getListNewsCategory";
import getNewsDetail from "../../../core/services/api/get/News/getNewsDetail.js";
const Step1Schema = Yup.object().shape({
  Title: Yup.string().required("نام دوره لازم است"),
  GoogleTitle: Yup.string().required("نام گوگل دوره لازم است"),
  Describe: Yup.string().required("توضیحات لازم است"),
  MiniDescribe: Yup.string().required("توضیح کوتاه لازم است"),
});

const Step2Schema = Yup.object().shape({
  GoogleDescribe: Yup.string().required("توضیحات لازم است"),
  Keyword: Yup.string().required("کلید واژه  لازم است"),
  NewsCatregoryId: Yup.string().required("انتخاب کنید"),
});
const Step3Schema = Yup.object().shape({
  Image: Yup.mixed(),
});
const EmptySchema = Yup.object().shape({});
const NewsWizard = () => {
  const { id } = useParams();
  const isEdit = id ? true : false;
  const { data: newsData = {} } = useQuery({
    queryKey: ["EDIATDETAIL"],
    queryFn: () => getNewsDetail(id),
    enabled: isEdit,
  });
  console.log("f", id);

  const { data: CatData = [] } = useQuery({
    queryKey: ["GETALLCAT"],
    queryFn: () => getListNewsCategory(),
  });
  const firstData = newsData?.detailsNewsDto || null;
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = Math.round(((step - 1) / (totalSteps - 1)) * 100);
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();
  const currentSchema =
    step === 1
      ? Step1Schema
      : step === 2
      ? Step2Schema
      : step === 3
      ? Step3Schema
      : EmptySchema;

  const { mutate: createNew } = useMutation({
    mutationKey: ["CREATENEW"],
    mutationFn: (val) => CreateNews(val),
    onError: (err) => toast.error(err.response?.data?.message),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/news-list");
      queryClient.invalidateQueries(["ALLNEWS"]);
    },
  });
  const { mutate: updateNew } = useMutation({
    mutationKey: ["UPDATENEW"],
    mutationFn: (val) => editNews(val),
    onError: (err) => toast.error(err.response?.data?.message),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/news-detail/${id}`);
      queryClient.invalidateQueries(["NEWSDETAIL"]);
    },
  });
  return (
    <Container className="py-1">
      <Row className="justify-content-center">
        <Col md={9}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">
                فرم خبر — مرحله {step} از {totalSteps}
              </h4>
              <ProgressBar now={progress} className="mb-3" />

              <Formik
                initialValues={{
                  Title: firstData ? firstData.title : "",
                  GoogleTitle: firstData ? firstData.googleTitle : "",
                  Describe: firstData ? firstData.describe : "",
                  GoogleDescribe: firstData ? firstData.googleDescribe : "",
                  MiniDescribe: firstData ? firstData.miniDescribe : "",
                  Image: firstData ? firstData.currentImageAddress : "",
                  Keyword: firstData ? firstData.keyword : "",
                  NewsCatregoryId: firstData ? firstData.newsCatregoryId : "",
                }}
                enableReinitialize
                validationSchema={currentSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values) => {
                  if (step < totalSteps) {
                    setStep(step + 1);
                    console.log(values);

                    return;
                  }

                  const fd = new FormData();
                  {
                    firstData ? fd.append("Id", firstData.id) : "";
                  }
                  fd.append("Title", values.Title);
                  fd.append("GoogleTitle", values.GoogleTitle);
                  fd.append("Describe", values.Describe);
                  fd.append("MiniDescribe", values.MiniDescribe);
                  fd.append("Image", values.Image);
                  fd.append("GoogleDescribe", values.GoogleDescribe);
                  fd.append(
                    "NewsCatregoryId",
                    parseInt(values.NewsCatregoryId)
                  );
                  fd.append("Keyword", values.Keyword);

                  {
                    firstData ? updateNew(fd) : createNew(fd);
                  }
                }}
              >
                {({ values, errors, setFieldValue, handleSubmit }) => {
                  const cleaningDescribe = DOMPurify.sanitize(values.Describe);
                  const selectedLevel =
                    CatData?.find((lvl) => lvl.id === values.NewsCatregoryId)
                      ?.categoryName || "";
                  return (
                    <Form onSubmit={handleSubmit}>
                      {step === 1 && (
                        <>
                          <Form.Group className="mb-3">
                            <Form.Label>نام خبر</Form.Label>
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
                            <Form.Label>نام گوگل خبر</Form.Label>
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

                            <ReactQuill
                              theme="snow"
                              value={values.Describe}
                              onChange={(content) =>
                                setFieldValue("Describe", content)
                              }
                              className={errors.Describe ? "is-invalid" : ""}
                              modules={{
                                toolbar: [
                                  [{ header: [1, 2, 3, 4, 5, false] }],
                                  ["bold", "italic", "underline", "strike"],
                                  [{ color: [] }, { background: [] }],
                                  [{ list: "ordered" }, { list: "bullet" }],
                                  ["link", "image"],
                                  ["clean"],
                                ],
                              }}
                              style={{ height: "110px", marginBottom: "60px" }}
                            />

                            {errors.Describe && (
                              <div className="text-danger small mt-1">
                                {errors.Describe}
                              </div>
                            )}
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
                            <Col>
                              <Form.Group className="mb-3">
                                <Form.Label>توضیحات گوگل</Form.Label>
                                <Form.Control
                                  value={values.GoogleDescribe}
                                  onChange={(e) =>
                                    setFieldValue(
                                      "GoogleDescribe",
                                      e.target.value
                                    )
                                  }
                                  isInvalid={!!errors.GoogleDescribe}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.GoogleDescribe}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>

                            <Col>
                              <Form.Group className="mb-3">
                                <Form.Label>کلید واژه</Form.Label>
                                <Form.Control
                                  value={values.Keyword}
                                  onChange={(e) =>
                                    setFieldValue("Keyword", e.target.value)
                                  }
                                  isInvalid={!!errors.Keyword}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.Keyword}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Group>
                                <Form.Label>انتخاب دسته بندی</Form.Label>
                                <Form.Select
                                  value={values.NewsCatregoryId}
                                  onChange={(e) =>
                                    setFieldValue(
                                      "NewsCatregoryId",
                                      e.target.value
                                    )
                                  }
                                  isInvalid={!!errors.NewsCatregoryId}
                                >
                                  <option value="">انتخاب کنید</option>

                                  {CatData?.length > 0 ? (
                                    CatData.map((item, index) => (
                                      <option key={index} value={item.id}>
                                        {item.categoryName}
                                      </option>
                                    ))
                                  ) : (
                                    <option>داده ای یافت نشد</option>
                                  )}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  {errors.NewsCatregoryId}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col></Col>
                          </Row>
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <h5 className="mb-3 text-center">انتخاب عکس دوره</h5>
                          <Form.Group className="text-center">
                            <div className="mb-3">
                              {values.Image ? (
                                <Image
                                  src={photoPreview || values.Image || ""}
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

                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                setFieldValue("Image", file);

                                setPhotoPreview(URL.createObjectURL(file));
                              }}
                              isInvalid={!!errors.Image}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.Image}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </>
                      )}

                      {step === 4 && (
                        <>
                          <h5 className="text-center mb-1">
                            پیش‌نمایش نهایی دوره
                          </h5>
                          <Card className="p-3 shadow-sm text-center">
                            <div className="mb-2">
                              {values.Image !== "" ? (
                                <Image
                                  src={photoPreview || values.Image || ""}
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
                            <p
                              style={{
                                display: "flex",
                                gap: "5px",
                                margin: "0 auto",
                              }}
                            >
                              <strong>توضیحات: </strong>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: cleaningDescribe,
                                }}
                              />
                            </p>
                            <p>
                              <strong>توضیح کوتاه: </strong>{" "}
                              {values.MiniDescribe}
                            </p>

                            <p>
                              <strong> دسته بندی خبر: </strong> {selectedLevel}
                            </p>
                          </Card>
                        </>
                      )}

                      <div className="d-flex justify-content-between mt-4">
                        <Button
                          variant="secondary"
                          disabled={step === 1}
                          onClick={() => setStep(step - 1)}
                        >
                          قبلی
                        </Button>

                        <Button type="submit" variant="primary">
                          {step === totalSteps ? "ثبت نهایی" : "بعدی"}
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsWizard;
