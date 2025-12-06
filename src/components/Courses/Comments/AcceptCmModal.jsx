import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, Modal } from "reactstrap";

import { toast } from "react-toastify";
import { AcceptCm } from "../../../core/services/api/post/Courses/AcceptCm";
const AcceptCmModal = ({ commentId, toggleEditModal, isOpen }) => {
  const queryClient = useQueryClient();
  const { mutate: accept, isPending } = useMutation({
    mutationKey: ["ACCEPTCM"],
    mutationFn: (payload) => AcceptCm(payload),
    onError: (err) => {
      if (err) {
        toast.error(err.response?.data?.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      toggleEditModal(false);
      queryClient.invalidateQueries(["GETCOURSECOMMENT", "GETALLCM"]);
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleEditModal(false)}
      className="modal-dialog-centered"
      style={{ maxWidth: "350px" }}
    >
      <div className="d-flex flex-column align-items-center gap-2 py-2">
        <span>آیا میخواهید این کامنت را تایید کنید؟</span>
        <div className="d-flex flex-row gap-1">
          <Button onClick={() => toggleEditModal(false)}>انصراف</Button>
          <Button
            onClick={() => {
              console.log("id", commentId);
              accept(commentId);
            }}
            color="primary"
          >
            {isPending ? "در حال تایید" : "تایید"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AcceptCmModal;
