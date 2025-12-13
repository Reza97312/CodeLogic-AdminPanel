import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Badge,
  Modal,
  ModalBody,
  Label,
  Input,
  ModalFooter,
  Form,
  ModalHeader,
} from "reactstrap";

import Select from "react-select";
import { selectThemeColors } from "@utils";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { CreateNewsCat } from "../../../core/services/api/post/News/CreateNewsCat";
import * as Yup from "yup";
const CreateNewsCatModal = ({ isOpen, toggle }) => {
  const validationSchema = Yup.object({
    CategoryName: Yup.string()
      .required("نام تکنولوژی الزامی است")
      .min(2, "حداقل ۲ کاراکتر وارد کنید"),

    GoogleTitle: Yup.string()
      .required("عنوان گوگل الزامی است")
      .min(3, "حداقل ۳ کاراکتر وارد کنید"),

    GoogleDescribe: Yup.string().min(5, "حداقل ۵ کاراکتر وارد کنید").nullable(),
  });
  const queryClient = useQueryClient();
  const { mutate: createCat, isPending } = useMutation({
    mutationKey: ["CREATECATT"],
    mutationFn: (vals) => CreateNewsCat(vals),
    onError: (err) => toast.error(err?.response?.data?.message),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["GETALLNEWSCAT"]);
      toggle(false);
    },
  });
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={() => toggle(false)}
        className="modal-dialog-centered"
        style={{ maxWidth: "450px" }}
      >
        <ModalHeader toggle={() => toggle(false)}>ساخت دسته بندی</ModalHeader>
        <Formik
          initialValues={{
            CategoryName: "",
            GoogleTitle: "",
            GoogleDescribe: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const fd = new FormData();
            fd.append("CategoryName", values.CategoryName);
            fd.append("GoogleTitle", values.GoogleTitle);
            fd.append("GoogleDescribe", values.GoogleDescribe);
            createCat(fd);
          }}
        >
          {({ values, errors, setFieldValue, handleSubmit, touched }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <div className="mb-4">
                  <Label className="form-label fw-semibold">
                    نام دسته بندی
                  </Label>
                  <Input
                    value={values.CategoryName}
                    onChange={(e) =>
                      setFieldValue("CategoryName", e.target.value)
                    }
                    invalid={touched.CategoryName && !!errors.CategoryName}
                  />
                  {touched.CategoryName && errors.CategoryName && (
                    <small className="text-danger">{errors.CategoryName}</small>
                  )}
                </div>
                <div className="mb-4">
                  <Label className="form-label fw-semibold">عنوان گوگل</Label>
                  <Input
                    value={values.GoogleTitle}
                    onChange={(e) =>
                      setFieldValue("GoogleTitle", e.target.value)
                    }
                    invalid={touched.GoogleTitle && !!errors.GoogleTitle}
                  />
                  {touched.GoogleTitle && errors.GoogleTitle && (
                    <small className="text-danger">{errors.GoogleTitle}</small>
                  )}
                </div>
                <div className="mb-4">
                  <Label className="form-label fw-semibold">توضیحات گوگل</Label>
                  <Input
                    value={values.GoogleDescribe}
                    onChange={(e) =>
                      setFieldValue("GoogleDescribe", e.target.value)
                    }
                    invalid={touched.GoogleDescribe && !!errors.GoogleDescribe}
                  />
                  {touched.GoogleDescribe && errors.GoogleDescribe && (
                    <small className="text-danger">
                      {errors.GoogleDescribe}
                    </small>
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="d-flex justify-content-between">
                <Button color="danger" onClick={() => toggle(false)}>
                  انصراف
                </Button>
                <Button type="submit" color="primary">
                  {isPending ? "در حال ارسال..." : "ارسال"}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CreateNewsCatModal;
