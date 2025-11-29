import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import loading from "../../../assets/images/A/loading.gif";
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
import { GetCourseStatus } from "../../../core/services/api/get/Courses/GetCourseStatus";
import { UpdateStatus } from "../../../core/services/api/put/Courses/UpdateStatus";
import { toast } from "react-toastify";

const SelectSchema = Yup.object().shape({
  StatusId: Yup.string().required("یک گزینه انتخاب کنید"),
});

const CourseStatus = ({ detailsData, isOpen, toggleStatus }) => {
  console.log("details", detailsData);

  const queryClient = useQueryClient();
  const { data: statuses, isPending } = useQuery({
    queryKey: ["GETSTATUSES"],
    queryFn: () => GetCourseStatus(),
  });
  const { mutate: UpdateStat } = useMutation({
    mutationKey: ["UPDATESTATUS"],
    mutationFn: (values) => UpdateStatus(values),
    onError: (err) => {
      if (err) {
        toast.error(err.response?.data?.message);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        toggleStatus(false);
        queryClient.invalidateQueries(["COURSEBYID"]);
      }
    },
  });
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={() => toggleStatus(false)}
        className="modal-dialog-centered"
        style={{ maxWidth: "600px" }}
      >
        <ModalBody>
          <p
            className="mb-1 pt-2 text-center fw-bold fs-5"
            style={{ letterSpacing: "0.5px" }}
          >
            ویرایش وضعیت دوره
          </p>

          <div className="mb-4">
            <Formik
              initialValues={{
                CourseId: detailsData?.courseId,
                StatusId: detailsData?.statusId,
              }}
              validationSchema={SelectSchema}
              onSubmit={(values) => UpdateStat(values)}
            >
              {({ values, errors, setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Form.Group>
                      <Form.Label>انتخاب وضعیت</Form.Label>
                      <Form.Select
                        value={values.StatusId}
                        onChange={(e) =>
                          setFieldValue("StatusId", e.target.value)
                        }
                        isInvalid={!!errors.StatusId}
                      >
                        {isPending
                          ? "درحال بارگزاری"
                          : statuses.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.statusName}
                              </option>
                            ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.StatusId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button
                      color="secondary"
                      outline
                      onClick={() => toggleStatus(false)}
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

export default CourseStatus;
