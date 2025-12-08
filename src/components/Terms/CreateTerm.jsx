import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";

import { toast } from "react-toastify";
import { Formik } from "formik";
import { GetDepartments } from "../../core/services/api/get/Terms/GetDepartments.js";

import { PostCreateTerm } from "../../core/services/api/post/Term/CreateTerm.js";
import * as Yup from "yup";
import DateObject from "react-date-object";
import { UpdateTerm } from "../../core/services/api/put/Terms/UpdateTerm.js";

const CreateTermModal = ({ isOpen, toggle, editData }) => {
  const validationSchema = Yup.object({
    termName: Yup.string().required("نام ترم لازم است"),
    departmentId: editData
      ? Yup.string().notRequired()
      : Yup.string().required("انتخاب دپارتمان لازم است"),
    startDate: Yup.string().required("تاریخ شروع لازم است"),
    endDate: Yup.string().required("تاریخ پایان لازم است"),
    expire: editData
      ? Yup.boolean().required("انتخاب وضعیت لازم است")
      : Yup.boolean().notRequired(),
  });

  const queryClient = useQueryClient();

  const { data: Departments = [], isPending: PendingDepartment } = useQuery({
    queryKey: ["ALLDEPARTMENTS"],
    queryFn: GetDepartments,
    enabled: !editData,
  });

  const { mutate: addTerm, isPending } = useMutation({
    mutationKey: ["CREATETERM"],
    mutationFn: (payload) => PostCreateTerm(payload),
    onSuccess: (data) => {
      toast.success(data.message);
      toggle(false);
      queryClient.invalidateQueries(["ALLTERMS"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
  });
  const { mutate: updateTerm } = useMutation({
    mutationKey: ["UPDATETERM"],
    mutationFn: (vals) => UpdateTerm(vals),
    onSuccess: (data) => {
      toast.success(data.message);
      toggle(false);
      queryClient.invalidateQueries(["ALLTERMS"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
  });

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
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle(false)}
      className="modal-dialog-centered"
      style={{ maxWidth: "450px" }}
    >
      <ModalHeader>{editData ? "ویرایش" : "افزودن"} ترم</ModalHeader>

      <Formik
        initialValues={{
          id: editData ? editData.id : null,
          termName: editData?.termName || "",
          departmentId: editData ? "" : "",
          startDate: editData ? editData.startDate : "",
          endDate: editData ? editData.endDate : "",
          expire: editData ? editData.expire : undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (editData) {
            const payload = {
              id: values.id,
              termName: values.termName,
              startDate: values.startDate,
              endDate: values.endDate,
              expire: values.expire,
            };

            updateTerm(payload);
          } else {
            const payload = {
              termName: values.termName,
              departmentId: values.departmentId,
              startDate: values.startDate,
              endDate: values.endDate,
            };

            addTerm(payload);
          }
        }}
      >
        {({ errors, values, touched, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>نام ترم</Label>
                <Input
                  value={values.termName}
                  onChange={(e) => setFieldValue("termName", e.target.value)}
                  invalid={touched.termName && !!errors.termName}
                />
                <FormFeedback>{errors.termName}</FormFeedback>
              </FormGroup>
              {!editData && (
                <FormGroup>
                  <Label>انتخاب دپارتمان</Label>
                  <Input
                    type="select"
                    value={values.departmentId}
                    onChange={(e) =>
                      setFieldValue("departmentId", e.target.value)
                    }
                    invalid={touched.departmentId && !!errors.departmentId}
                  >
                    <option value="">انتخاب کنید</option>

                    {PendingDepartment ? (
                      <option>در حال بارگزاری...</option>
                    ) : Departments?.length > 0 ? (
                      Departments.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.depName}
                        </option>
                      ))
                    ) : (
                      <option>دپارتمانی یافت نشد</option>
                    )}
                  </Input>
                  <FormFeedback>{errors.departmentId}</FormFeedback>
                </FormGroup>
              )}
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>تاریخ شروع</Label>
                    <DatePicker
                      value={
                        editData ? toJalali(values.startDate) : values.startDate
                      }
                      inputClass="form-control"
                      onChange={(d) => {
                        console.log(
                          "startDate",
                          convertToUTC(d.format("YYYY/MM/DD"))
                        );

                        setFieldValue(
                          "startDate",
                          convertToUTC(d?.format("YYYY/MM/DD"))
                        );
                      }}
                      calendar={persian}
                      locale={persian_fa}
                    />
                    <div className="text-danger small">{errors.startDate}</div>
                  </FormGroup>
                </Col>

                <Col md="6">
                  <FormGroup>
                    <Label>تاریخ پایان</Label>
                    <DatePicker
                      value={
                        editData ? toJalali(values.endDate) : values.endDate
                      }
                      inputClass="form-control"
                      onChange={(d) => {
                        console.log(
                          "endDate",
                          convertToUTC(d.format("YYYY/MM/DD"))
                        );

                        setFieldValue(
                          "endDate",
                          convertToUTC(d?.format("YYYY/MM/DD"))
                        );
                      }}
                      calendar={persian}
                      locale={persian_fa}
                    />
                    <div className="text-danger small">{errors.endDate}</div>
                  </FormGroup>
                </Col>
              </Row>
              {editData && (
                <FormGroup>
                  <Label>تعیین وضعیت</Label>
                  <Input
                    type="select"
                    value={values.expire}
                    onChange={(e) =>
                      setFieldValue("expire", e.target.value === "true")
                    }
                    invalid={!!errors.expire}
                  >
                    <option value={true}>منقضی شده</option>
                    <option value={false}>منقضی نشده</option>
                  </Input>
                  <FormFeedback>{errors.expire}</FormFeedback>
                </FormGroup>
              )}
            </ModalBody>

            <ModalFooter className="d-flex justify-content-between">
              <Button color="danger" onClick={() => toggle(false)}>
                انصراف
              </Button>

              <Button type="submit" color="primary">
                {isPending ? "درحال ارسال..." : "ارسال"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateTermModal;
