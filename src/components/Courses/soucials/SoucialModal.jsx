import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
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
import { toast } from "react-toastify";
import { CreateSoucial } from "../../../core/services/api/post/Courses/CreateSoucial";
import { EditCourseSoucials } from "../../../core/services/api/put/Courses/EditCourseSoucials";

const SelectSchema = Yup.object().shape({
  groupLink: Yup.string()
    .url("لینک معتبر نیست")
    .required("وارد کردن لینک الزامی است"),
  groupName: Yup.string().required("وارد کردن نام گروه الزامی است"),
});

const SoucialModal = ({ courseId, isOpen, toggleSocialModal, EditData }) => {
  const queryClient = useQueryClient();
  const { mutate: Create, isPending } = useMutation({
    mutationKey: ["CREATESOUCIAL"],
    mutationFn: (payload) => CreateSoucial(payload),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message);
        toggleSocialModal(false);
        queryClient.invalidateQueries(["SOUCIALS"]);
      }
    },
  });
  const { mutate: update } = useMutation({
    mutationKey: ["CREATESOUCIAL"],
    mutationFn: (payload) => EditCourseSoucials(payload),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message);
        toggleSocialModal(false);
        queryClient.invalidateQueries(["SOUCIALS"]);
      }
    },
  });
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={() => toggleSocialModal(false)}
        className="modal-dialog-centered"
        style={{ maxWidth: "600px" }}
      >
        <ModalBody>
          <p
            className="mb-1 pt-2 text-center fw-bold fs-5"
            style={{ letterSpacing: "0.5px" }}
          >
            ساخت گروه مجازی
          </p>

          <div className="mb-4">
            <Formik
              enableReinitialize
              initialValues={{
                id: EditData?.id || "",
                groupName: EditData?.groupName || "",
                groupLink: EditData?.groupLink || "",
                courseId: courseId,
              }}
              validationSchema={SelectSchema}
              onSubmit={(values) => {
                console.log(values);
                {
                  EditData ? update(values) : Create(values);
                }
              }}
            >
              {({ values, errors, setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Form.Group className="mb-3">
                      <Form.Label>نام گروه</Form.Label>
                      <Form.Control
                        value={values.groupName}
                        onChange={(e) =>
                          setFieldValue("groupName", e.target.value)
                        }
                        isInvalid={!!errors.groupName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.groupName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>لینک گروه</Form.Label>
                      <Form.Control
                        value={values.groupLink}
                        onChange={(e) =>
                          setFieldValue("groupLink", e.target.value)
                        }
                        isInvalid={!!errors.groupLink}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.groupLink}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button
                      color="secondary"
                      outline
                      onClick={() => toggleSocialModal(false)}
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
                      {isPending ? "درحال ارسال" : "ارسال"}
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

export default SoucialModal;
