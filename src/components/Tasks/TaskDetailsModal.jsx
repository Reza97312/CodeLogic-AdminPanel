import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import DOMPurify from "dompurify";
import { PersianDateConverter } from "../../utility/helper/PersianDateConverter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetTaskById } from "../../core/services/api/get/Tasks/GetTaskById";
import loading from "../../assets/images/A/loading.gif";
const TaskDetailsModal = ({ isOpen, toggle, id }) => {
  const { data: detail = {}, isPending } = useQuery({
    queryKey: ["TASKDETAIL"],
    queryFn: () => GetTaskById(id),
  });

  return (
    <Modal isOpen={isOpen} toggle={() => toggle(false)} size="md">
      <ModalHeader>جزییات تسک</ModalHeader>

      <ModalBody>
        {isPending ? (
          <img src={loading} className="mx-auto" />
        ) : (
          <>
            <div className="mb-2">
              <strong>نام تسک:</strong>
              <div>{detail?.worktitle}</div>
            </div>

            <div className="mb-2">
              <strong>تاریخ:</strong>
              <div>{PersianDateConverter(detail?.workDate)}</div>
            </div>

            <div className="mb-2">
              <strong>توضیحات:</strong>
              <div
                className="border rounded p-2"
                style={{ background: "#fafafa", minHeight: "50px" }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(detail.workDescribe),
                }}
              />
            </div>
          </>
        )}
      </ModalBody>

      <ModalFooter>
        <Button color="danger" onClick={() => toggle(false)}>
          بستن
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaskDetailsModal;
