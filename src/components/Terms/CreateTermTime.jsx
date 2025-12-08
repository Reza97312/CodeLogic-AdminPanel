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

import * as Yup from "yup";
import DateObject from "react-date-object";
import { PostCreateTime } from "../../core/services/api/post/Term/CreateTermTime";

const TermTimeModal = ({ editData, isOpen, toggle }) => {
  const validationSchema = Yup.object({
    closeReason: Yup.string().required("پرکردن توضیحات الزامی است"),
    startCloseDate: Yup.string().required("تاریخ شروع لازم است"),
    endCloseDate: Yup.string().required("تاریخ پایان لازم است"),
  });

  const queryClient = useQueryClient();

  const { mutate: addTime, isPending } = useMutation({
    mutationKey: ["CREATETIME"],
    mutationFn: (payload) => PostCreateTime(payload),
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
      <ModalHeader>افزودن بازه زمانی بسته بودن ترم</ModalHeader>

      <Formik
        initialValues={{
          termId: editData?.id || "",
          startCloseDate: "",
          endCloseDate: "",
          closeReason: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => addTime(values)}
      >
        {({ errors, values, touched, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label> تاریخ شروع بستن</Label>
                    <DatePicker
                      value={
                        editData
                          ? toJalali(values.startCloseDate)
                          : values.startCloseDate
                      }
                      inputClass="form-control"
                      onChange={(d) => {
                        console.log(
                          "startCloseDate",
                          convertToUTC(d.format("YYYY/MM/DD"))
                        );

                        setFieldValue(
                          "startCloseDate",
                          convertToUTC(d?.format("YYYY/MM/DD"))
                        );
                      }}
                      calendar={persian}
                      locale={persian_fa}
                    />
                    <div className="text-danger small">
                      {errors.startCloseDate}
                    </div>
                  </FormGroup>
                </Col>

                <Col md="6">
                  <FormGroup>
                    <Label>تاریخ پایان بستن</Label>
                    <DatePicker
                      value={
                        editData
                          ? toJalali(values.endCloseDate)
                          : values.endCloseDate
                      }
                      inputClass="form-control"
                      onChange={(d) => {
                        console.log(
                          "endCloseDate",
                          convertToUTC(d.format("YYYY/MM/DD"))
                        );

                        setFieldValue(
                          "endCloseDate",
                          convertToUTC(d?.format("YYYY/MM/DD"))
                        );
                      }}
                      calendar={persian}
                      locale={persian_fa}
                    />
                    <div className="text-danger small">
                      {errors.endCloseDate}
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>دلیل بستن</Label>
                <Input
                  value={values.closeReason}
                  onChange={(e) => setFieldValue("closeReason", e.target.value)}
                  invalid={touched.closeReason && !!errors.closeReason}
                />
                <FormFeedback>{errors.closeReason}</FormFeedback>
              </FormGroup>
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

export default TermTimeModal;
