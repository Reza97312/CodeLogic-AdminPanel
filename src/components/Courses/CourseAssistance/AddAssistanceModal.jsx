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

import { Form } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import GetAllUser from "../../../core/services/api/get/GetAllUser.js";
import { AddAssistance } from "../../../core/services/api/post/Courses/AddAssisTance.js";
import { UpdateAssistance } from "../../../core/services/api/put/Courses/UpdateAssistance.js";
const SelectSchema = Yup.object().shape({
  userId: Yup.string().required("وارد کردن نام منتور الزامی است"),
});

const AddAssistanceModal = ({
  courseId,
  isOpen,
  toggleAssistanceModal,
  EditData,
}) => {
  const { data: Users, isPending: pendingUser } = useQuery({
    queryKey: ["ALLUSERS"],
    queryFn: () => GetAllUser(),
  });
  const userData = Users?.listUser;
  console.log("ss", userData);

  const queryClient = useQueryClient();
  const { mutate: AddAssis, isPending } = useMutation({
    mutationKey: ["ADDASSISTANCE"],
    mutationFn: (payload) => AddAssistance(payload),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message);
        toggleAssistanceModal(false);
        queryClient.invalidateQueries(["ASSISTANCE"]);
      }
    },
  });
  const { mutate: UpdateAssis } = useMutation({
    mutationKey: ["UPDATEASSISTANCE"],
    mutationFn: (payload) => UpdateAssistance(payload),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message);
        toggleAssistanceModal(false);
        queryClient.invalidateQueries(["ASSISTANCE"]);
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
            {EditData ? "ویرایش" : "افزودن"} منتور
          </p>

          <div className="mb-4">
            <Formik
              enableReinitialize
              initialValues={{
                id: EditData?.id || null,
                userId: EditData?.userId || 0,
                courseId: courseId,
              }}
              validationSchema={SelectSchema}
              onSubmit={(values) => {
                console.log(values);
                {
                  EditData ? UpdateAssis(values) : AddAssis(values);
                }
              }}
            >
              {({ values, errors, setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Form.Group className="mb-3">
                      <Form.Label>نام منتور</Form.Label>
                      <Form.Select
                        value={values.userId}
                        onChange={(e) =>
                          setFieldValue("userId", parseInt(e.target.value))
                        }
                        isInvalid={!!errors.userId}
                      >
                        <option value={0}>انتخاب کنید...</option>
                        {pendingUser
                          ? "درحال بارگزاری"
                          : userData.map((item, index) => (
                              <option key={index} value={item.id}>
                                {!item.fName && !item.lName ? "بدون اسم " : ""}
                                {item.fName}
                                {item.lName}
                              </option>
                            ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.userId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button
                      color="secondary"
                      onClick={() => toggleAssistanceModal(false)}
                      outline
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

export default AddAssistanceModal;
