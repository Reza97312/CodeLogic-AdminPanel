import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { EditCourseExpire } from "../../../core/services/api/put/Courses/EditCourseExpire.js";
import { toast } from "react-toastify";
const ChangeExpireModal = ({ isOpen, toggle, editData }) => {
  const { mutate: editEx, isPending } = useMutation({
    mutationKey: ["EDITEX"],
    mutationFn: (payload) => EditCourseExpire(payload),
    onError: (err) => {
      toast.error(err.response?.data?.message || " Error 404 ");
    },
    onSuccess: (data) => {
      toast.success(data.message);
      toggle(false);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle(false)}
      className="modal-dialog-centered"
      style={{ maxWidth: "350px" }}
    >
      <ModalHeader toggle={() => toggle(false)}>
        <h4> ایا میخواهید دوره را غیرمنقضی کنید ؟</h4>
      </ModalHeader>
      <ModalBody>
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button color="danger" onClick={() => toggle(false)}>
            انصراف
          </Button>
          <Button
            onClick={() => {
              editEx({
                id: editData.courseId,
                active: editData.active,
              });
            }}
            color="primary"
          >
            {isPending ? "در حال ارسال" : "ارسال"}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ChangeExpireModal;
