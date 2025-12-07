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
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { PostCreateTech } from "../../../core/services/api/post/Courses/CreateTech";
const CreateTech = ({ isOpen, toggle }) => {
  const queryClient = useQueryClient();
  const validationSchema = Yup.object({
    techName: Yup.string().required("پرکردن این فیلد الزامیست"),
    describe: Yup.string().required("پرکردن این فیلد الزامیست"),
  });
  const { mutate: CreateTech, isPending } = useMutation({
    mutationKey: ["CREATETECH"],
    mutationFn: (payload) => PostCreateTech(payload),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success("تکنولوژی با موفقیت ساخته شد");
      toggle(false);
      queryClient.invalidateQueries(["GETALLTECHS"]);
    },
  });
  return (
    <Modal isOpen={isOpen} toggle={() => toggle(false)}>
      <ModalHeader>ساخت تکنولوژی</ModalHeader>

      <Formik
        initialValues={{
          techName: "",
          describe: "",
          iconAddress: "",
          parentId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          CreateTech(values);
        }}
      >
        {({ errors, values, setFieldValue, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <Form.Group className="mb-3">
                  <Form.Label>نام تکنولوژی</Form.Label>
                  <Form.Control
                    value={values.techName}
                    onChange={(e) => setFieldValue("techName", e.target.value)}
                    isInvalid={!!errors.techName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.techName}
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

export default CreateTech;
