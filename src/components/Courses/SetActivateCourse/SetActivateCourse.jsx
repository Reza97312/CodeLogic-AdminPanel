import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { selectThemeColors } from "@utils";
import { Form } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { toast } from "react-toastify";
import { UpdateActivition } from "../../../core/services/api/put/Courses/UpdateActivition";

const SelectSchema = Yup.object().shape({
  active: Yup.string().required("یک گزینه انتخاب کنید"),
});
const SetActivateCourse = ({ activeData, toggleActiveModal, isOpen }) => {
  const queryClient = useQueryClient();
  const { mutate: changeActive } = useMutation({
    mutationKey: ["ACTIVECOURSE"],
    mutationFn: (payload) => UpdateActivition(payload),
    onError: (err) => {
      if (err) {
        toast.error(err.response?.data?.message);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        toggleActiveModal(false);
        queryClient.invalidateQueries(["ALLCOURSES"]);
      }
    },
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={() => toggleActiveModal(false)}
        className="modal-dialog-centered"
        style={{ maxWidth: "600px" }}
      >
        <ModalHeader toggle={() => toggleActiveModal(false)}>
          <h3> فعال / غیرفعال کردن دوره</h3>
        </ModalHeader>
        <ModalBody>
          <div className="mb-4">
            <Formik
              initialValues={{
                active: String(activeData?.active),
                id: activeData?.courseId,
              }}
              validationSchema={SelectSchema}
              onSubmit={(values) => {
                const payload = {
                  active: values.active === "true",
                  id: values.id,
                };
                changeActive(payload);
              }}
            >
              {({ values, errors, setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Form.Group>
                      <Form.Label>انتخاب کنید</Form.Label>
                      <Form.Select
                        value={values.active}
                        onChange={(e) =>
                          setFieldValue("active", e.target.value)
                        }
                        isInvalid={!!errors.active}
                      >
                        <option value="true">فعال</option>
                        <option value="false">غیر فعال</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.active}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button
                      color="secondary"
                      outline
                      onClick={() => toggleActiveModal(false)}
                      style={{
                        padding: "0.5rem 1.2rem",
                        borderRadius: "6px",
                        transition: "all 0.2s",
                      }}
                    >
                      انصراف
                    </Button>

                    <Button
                      color="primary"
                      type="submit"
                      style={{
                        padding: "0.5rem 1.5rem",
                        borderRadius: "6px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        transition: "all 0.2s",
                      }}
                    >
                      ارسال
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SetActivateCourse;
