import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button, Modal } from "reactstrap";
import { DeleteCourseGroup } from "../../../../core/services/api/delete/DeleteCourseGroup";
import { toast } from "react-toastify";

const DeleteGroupModal = ({ isOpen, toggleDeleteModal, groupId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteGroup, isPending } = useMutation({
    mutationKey: ["DELETEGROUP"],
    mutationFn: (value) => DeleteCourseGroup(value),
    onError: (err) => {
      if (err) {
        toast.error(err.response?.data?.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      toggleDeleteModal(false);
      queryClient.invalidateQueries(["COURSEGROUPS"]);
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleDeleteModal(false)}
      className="modal-dialog-centered"
      style={{ maxWidth: "350px" }}
    >
      <div className="d-flex flex-column align-items-center gap-4 py-2">
        <span>آیا میخواهید این گروه را حذف کنید؟</span>
        <div className="d-flex flex-row gap-1">
          <Button onClick={() => toggleDeleteModal(false)}>انصراف</Button>
          <Button
            onClick={() => {
              console.log("id", groupId);

              deleteGroup(groupId);
            }}
            color="primary"
          >
            حذف
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteGroupModal;
