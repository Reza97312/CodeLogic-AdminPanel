import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CommentsReplyTable from "./CommentsReplyTable";
import { useQuery } from "@tanstack/react-query";
import loading from "../../../assets/images/A/loading.gif";
import { GetCommentsReply } from "../../../core/services/api/get/Comments/GetCommentsReply.js";
const CommentReplyModal = ({
  courseId,
  commentId,
  isOpen,
  toggleReplyModal,
}) => {
  console.log("CourseId:", `"${courseId}"`);
  console.log("CommentId:", `"${commentId}"`);
  const { data: ReplyData = [], isPending } = useQuery({
    queryKey: ["GETREPLYS", courseId, commentId],
    queryFn: () =>
      GetCommentsReply({
        CourseId: courseId,
        CommentId: commentId,
      }),
    enabled: !!courseId && !!commentId,
  });

  return (
    <Modal className="modal-lg" isOpen={isOpen} toggle={toggleReplyModal}>
      <ModalHeader>ریپلای ها</ModalHeader>
      <ModalBody>
        {isPending ? (
          <img
            src={loading}
            style={{ margin: "0 auto", width: "100px", height: "100px" }}
          />
        ) : (
          <CommentsReplyTable ReplyData={ReplyData} />
        )}
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => toggleReplyModal(false)} color="danger">
          خروج
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CommentReplyModal;
