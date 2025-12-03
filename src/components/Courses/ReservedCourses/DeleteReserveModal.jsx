import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button, Modal } from "reactstrap";
import { toast } from "react-toastify";
import { DeleteReserve } from "../../../core/services/api/delete/Courses/DeleteReserve";

const DeleteReserveModal = ({ isOpen, toggleDeleteModal, reserveId }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteResrve, isPending } = useMutation({
    mutationKey: ["DELETERESERVE"],
    mutationFn: (val) => DeleteReserve({ id: val }),
    onError: (err) => {
      if (err) {
        toast.error(err.response?.data?.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      toggleDeleteModal(false);
      queryClient.invalidateQueries(["GETRESERVEDCOURSE"]);
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
        <span>آیا میخواهید این رزرو را حذف کنید؟</span>
        <div className="d-flex flex-row gap-1">
          <Button onClick={() => toggleDeleteModal(false)}>انصراف</Button>
          <Button
            onClick={() => {
              console.log("id", reserveId);

              deleteResrve(reserveId);
            }}
            color="primary"
          >
            {isPending ? "درحال حذف" : "حذف"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteReserveModal;
