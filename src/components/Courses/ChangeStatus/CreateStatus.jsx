import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  ProgressBar,
  Image,
} from "react-bootstrap";
import * as Yup from "yup";
import { PostCreateStatus } from "../../../core/services/api/post/Courses/CreateStatus";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
const CreateStatus = ({ isOpen, toggle }) => {
  const queryClient = useQueryClient();
  const validationSchema = Yup.object({
    statusName: Yup.string().required("پرکردن این فیلد الزامیست"),
    describe: Yup.string().required("پرکردن این فیلد الزامیست"),
    statusNumber: Yup.number().required("پرکردن این فیلد الزامیست"),
  });
  const { mutate: CreateStat, isPending } = useMutation({
    mutationKey: ["BUILDSTATUS"],
    mutationFn: (payload) => PostCreateStatus(payload),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      toggle(false);
      queryClient.invalidateQueries(["GETSTATUSES"]);
    },
  });
  return (
    <Modal isOpen={isOpen} toggle={() => toggle(false)}>
      <ModalHeader>ساخت وضعیت</ModalHeader>

      <Formik
        initialValues={{
          statusName: "",
          describe: "",
          statusNumber: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          CreateStat(values);
        }}
      >
        {({ errors, values, setFieldValue, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <Form.Group className="mb-3">
                  <Form.Label>نام وضعیت</Form.Label>
                  <Form.Control
                    value={values.statusName}
                    onChange={(e) =>
                      setFieldValue("statusName", e.target.value)
                    }
                    isInvalid={!!errors.statusName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.statusName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>توضیحات</Form.Label>
                  <Form.Control
                    value={values.describe}
                    onChange={(e) => setFieldValue("describe", e.target.value)}
                    isInvalid={!!errors.describe}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.describe}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>تایین عدد وضعیت</Form.Label>
                  <Form.Control
                    type="number"
                    value={values.statusNumber}
                    onChange={(e) =>
                      setFieldValue("statusNumber", e.target.value)
                    }
                    isInvalid={!!errors.statusNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.statusNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">
                  {isPending ? "درحال ارسال" : "ارسال"}
                </Button>
                <Button color="danger" onClick={() => toggle(false)}>
                  انصراف
                </Button>
              </ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default CreateStatus;
