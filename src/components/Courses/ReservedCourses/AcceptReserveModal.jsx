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
import { AcceptReserve } from "../../../core/services/api/post/Courses/AcceptReserve";
import { GetCourseGroups } from "../../../core/services/api/get/Courses/GetCourseGroups";
import { GetAllGroups } from "../../../core/services/api/get/Courses/GetAllGroups";

const SelectSchema = Yup.object().shape({
  courseGroupId: Yup.string().required("یک گزینه انتخاب کنید"),
});

const AcceptReserveModal = ({
  courseId,
  studentId,
  toggleAcceptModal,
  isOpen,
}) => {
  const queryClient = useQueryClient();
  const { data: GroupsData = {}, isPending } = useQuery({
    queryKey: ["ALLGROUPS"],
    queryFn: () => GetAllGroups(),
  });
  const { mutate: accept, isPending: pendingAccept } = useMutation({
    mutationKey: ["ACCEPTRESEVE"],
    mutationFn: (payload) => AcceptReserve(payload),
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message);
        queryClient.invalidateQueries(["GETRESERVEDCOURSE"]);
        toggleAcceptModal(false);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={() => toggleAcceptModal(false)}
        className="modal-dialog-centered"
        style={{ maxWidth: "600px" }}
      >
        <ModalBody>
          <p
            className="mb-1 pt-2 text-center fw-bold fs-5"
            style={{ letterSpacing: "0.5px" }}
          >
            برای تایید رزرو ابتدا یک گروه را برای دوره خود انتخاب کنید
          </p>

          <div className="mb-4">
            <Formik
              initialValues={{
                courseId: courseId || "",
                studentId: studentId || "",
                courseGroupId: "",
              }}
              validationSchema={SelectSchema}
              onSubmit={(values) => accept(values)}
            >
              {({ values, errors, setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Form.Group>
                      <Form.Label>انتخاب گروه</Form.Label>
                      <Form.Select
                        value={values.courseGroupId}
                        isInvalid={!!errors.courseGroupId}
                        onChange={(e) =>
                          setFieldValue("courseGroupId", e.target.value)
                        }
                      >
                        <option value={""}>انتخاب کنید</option>
                        {isPending
                          ? "درحال بارگزاری"
                          : GroupsData?.courseGroupDtos?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.groupName}
                              </option>
                            ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.courseGroupId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button
                      color="secondary"
                      outline
                      onClick={() => toggleAcceptModal(false)}
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
                      {pendingAccept ? "در حال تایید" : "تایید رزرو"}
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

export default AcceptReserveModal;
