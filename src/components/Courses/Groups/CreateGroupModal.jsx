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
import { CreateCourseG } from "../../../core/services/api/post/Courses/CreateCourseG";
import { UpdateCourseGroup } from "../../../core/services/api/put/Courses/UpdateCourseGroup";

const SelectSchema = Yup.object().shape({
  GroupCapacity: Yup.number().required("ظرفیت لازم است"),
  GroupName: Yup.string().required("وارد کردن نام گروه الزامی است"),
});

const CreateGroupModal = ({
  courseId,
  isOpen,
  toggleCreateGroupModal,
  EditGroupData,
}) => {
  const queryClient = useQueryClient();
  const { mutate: CreateGroup } = useMutation({
    mutationKey: ["CREATEGROUP"],
    mutationFn: (payload) => CreateCourseG(payload),
    onError: (err) => {
      if (err) {
        toast.error(err.response?.data?.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      toggleCreateGroupModal(false);
      queryClient.invalidateQueries(["COURSEGROUPS"]);
    },
  });
  const { mutate: UpdateGroup } = useMutation({
    mutationKey: ["UPDATEGROUP"],
    mutationFn: (payload) => UpdateCourseGroup(payload),
    onError: (err) => {
      if (err) {
        toast.error(err.response?.data?.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      toggleCreateGroupModal(false);
      queryClient.invalidateQueries(["COURSEGROUPS"]);
    },
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={() => toggleCreateGroupModal(false)}
        className="modal-dialog-centered"
        style={{ maxWidth: "600px" }}
      >
        <ModalBody>
          <p
            className="mb-1 pt-2 text-center fw-bold fs-5"
            style={{ letterSpacing: "0.5px" }}
          >
            {EditGroupData ? "ویرایش" : "ساخت"} گروه برای دوره
          </p>

          <div className="mb-4">
            <Formik
              enableReinitialize
              initialValues={{
                Id: EditGroupData?.id || "",
                CourseId: courseId,
                GroupName: EditGroupData?.groupName || "",
                GroupCapacity: EditGroupData?.groupCapacity || 0,
              }}
              validationSchema={SelectSchema}
              onSubmit={(values) => {
                console.log(values);
                {
                  EditGroupData ? UpdateGroup(values) : CreateGroup(values);
                }
              }}
            >
              {({ values, errors, setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Form.Group className="mb-3">
                      <Form.Label>نام گروه</Form.Label>
                      <Form.Control
                        value={values.GroupName}
                        onChange={(e) =>
                          setFieldValue("GroupName", e.target.value)
                        }
                        isInvalid={!!errors.GroupName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.GroupName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>ظرفیت دوره</Form.Label>
                      <Form.Control
                        type="number"
                        value={values.GroupCapacity}
                        onChange={(e) =>
                          setFieldValue("GroupCapacity", e.target.value)
                        }
                        isInvalid={!!errors.GroupCapacity}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.GroupCapacity}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button
                      color="secondary"
                      outline
                      onClick={() => toggleCreateGroupModal(false)}
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

export default CreateGroupModal;
