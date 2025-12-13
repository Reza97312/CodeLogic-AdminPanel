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

import getListNewsCategory from "../../../core/services/api/get/News/getListNewsCategory.js";
import { Formik } from "formik";
import { EditNewsCat } from "../../../core/services/api/put/News/EditNewsCat.js";
import CreateNewsCatModal from "./CreateNewsCatModal.jsx";
const EditNewsCatModal = ({ editData, isOpen, toggleTechModal }) => {
  const queryClient = useQueryClient();
  const { data: CatData = [] } = useQuery({
    queryKey: ["GETALLNEWSCAT"],
    queryFn: () => getListNewsCategory(),
  });
  const { mutate: ChangeCat, isPending } = useMutation({
    mutationKey: ["CHANGECAT"],
    mutationFn: (vals) => EditNewsCat(vals),
    onError: (err) => toast.error(err?.response?.data?.message),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["NEWSDETAIL"]);
      toggleTechModal(false);
    },
  });
  const [openCreateTech, setOpenCreateTech] = useState(false);
  const toggleCreate = (val) => setOpenCreateTech(val);
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={() => toggleTechModal(false)}
        className="modal-dialog-centered"
        style={{ maxWidth: "450px" }}
      >
        <ModalHeader toggle={() => toggleTechModal(false)}>
          ویرایش دسته بندی خبر
        </ModalHeader>
        <Formik
          initialValues={{
            Id: editData?.detailsNewsDto?.id || "",
            CategoryName: editData?.detailsNewsDto?.newsCatregoryName || "",
          }}
          onSubmit={(values) => {
            const fd = new FormData();
            fd.append("Id", values.Id);
            fd.append("CategoryName", values.CategoryName);
            ChangeCat(fd);
          }}
        >
          {({ values, errors, setFieldValue, handleSubmit, touched }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <div className="mb-4">
                  <Label className="form-label fw-semibold">دسته بندی ها</Label>
                  <Input
                    type="select"
                    value={values.CategoryName}
                    onChange={(e) =>
                      setFieldValue("CategoryName", e.target.value)
                    }
                  >
                    <option value="">انتخال کنید</option>
                    {CatData.map((items, index) => (
                      <option key={index} value={items.categoryName}>
                        {items.categoryName}
                      </option>
                    ))}
                  </Input>
                </div>
              </ModalBody>
              <ModalFooter className="d-flex justify-content-between">
                <Button color="danger" onClick={() => toggleTechModal(false)}>
                  انصراف
                </Button>
                <Button onClick={() => setOpenCreateTech(true)} color="info">
                  ساخت تکنولوژی
                </Button>
                <Button type="submit" color="primary">
                  {isPending ? "در حال ارسال..." : "ارسال"}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
      {openCreateTech && (
        <CreateNewsCatModal isOpen={openCreateTech} toggle={toggleCreate} />
      )}
    </>
  );
};

export default EditNewsCatModal;
