import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button, Modal } from "reactstrap";
import { DeleteCourseCm } from "../../../core/services/api/delete/Courses/DeleteCourseCm";
import { toast } from "react-toastify";

const DeleteCmModal = ({ toggleDeleteModal, isOpen, commentId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteCm, isPending } = useMutation({
    mutationKey: ["DELETECM"],
    mutationFn: () => DeleteCourseCm(commentId),
    onError: (err) => {
      if (err) {
        toast.error(err.response?.data?.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      toggleDeleteModal(false);
      queryClient.invalidateQueries(["GETCOURSECOMMENT"]);
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleDeleteModal(false)}
      className="modal-dialog-centered"
      style={{ maxWidth: "350px" }}
    >
      <div className="d-flex flex-column align-items-center gap-2 py-2">
        <span>آیا میخواهید این کامنت را حذف کنید؟</span>
        <div className="d-flex flex-row gap-1">
          <Button onClick={() => toggleDeleteModal(false)}>انصراف</Button>
          <Button
            onClick={() => {
              console.log("id", commentId);

              deleteCm(commentId);
            }}
            color="primary"
          >
            {isPending ? "در حال حذف" : "حذف"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCmModal;
