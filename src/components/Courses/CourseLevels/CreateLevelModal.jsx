import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { CreateCourseLevel } from "../../../core/services/api/post/Courses/CreateCourseLevel";
import { toast } from "react-toastify";

const CreateLevelModal = ({ isOpen, toggle }) => {
  const queryClient = useQueryClient();
  const [levelName, setLevelName] = useState("");
  const [error, setError] = useState("");
  const { mutate: CreateLev, isPending } = useMutation({
    mutationKey: ["CREATELEVEL"],
    mutationFn: (payLoad) => CreateCourseLevel(payLoad),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success("لول مورد نظر با موفقیت ساخته شد");
      toggle(false);
      queryClient.invalidateQueries(["ALLLEVELS"]);
    },
  });
  const handleSubmit = () => {
    if (!levelName.trim()) {
      setError("نام سطح نمی‌تواند خالی باشد!");
      return;
    }

    setError("");
    CreateLev({ levelName: levelName });
  };
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isOpen}
      toggle={() => toggle(false)}
    >
      <ModalHeader>ساخت سطح</ModalHeader>
      <ModalBody>
        <Label>نام سطح</Label>
        <Input
          placeholder="نام موردنظر برای سطح دوره را انتخاب کنید"
          type="text"
          onChange={(e) => setLevelName(e.target.value)}
          invalid={!!error}
        />
        {error && <FormFeedback>{error}</FormFeedback>}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          {isPending ? "درحال ارسال" : "ارسال"}
        </Button>
        <Button color="danger" onClick={() => toggle(false)}>
          انصراف
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateLevelModal;
