import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { ActiveBuilding } from "../../core/services/api/put/Buildings/ActiveBuilding";
import { toast } from "react-toastify";

const BuildActiveModal = ({ isOpen, toggle, editData }) => {
  const queryClient = useQueryClient();
  const { mutate: sendActive, isPending } = useMutation({
    mutationKey: ["ACTIVEBUILD"],
    mutationFn: (val) => ActiveBuilding(val),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["GETALLBUILDINGS"]);
      toggle(false);
    },
  });
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={isOpen}
        toggle={() => toggle(false)}
      >
        <ModalHeader>ویراش وضعیت</ModalHeader>
        <Formik
          initialValues={{
            id: editData?.id || "",
            active: editData?.active || "",
          }}
          onSubmit={(values) => sendActive(values)}
        >
          {({ errors, values, touched, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <Label>انتخاب وضعیت</Label>
                <Input
                  type="select"
                  value={values.active}
                  onChange={(e) =>
                    setFieldValue("active", e.target.value === "true")
                  }
                >
                  <option value="true">فعال</option>
                  <option value="false">غیرفعال</option>
                </Input>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
                  ارسال
                </Button>
                <Button color="danger" onClick={() => toggle(false)}>
                  انصراف
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default BuildActiveModal;
