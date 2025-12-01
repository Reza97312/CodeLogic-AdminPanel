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
} from "reactstrap";
import { GetAllTechs } from "../../../core/services/api/get/GetTechs/GetTechs";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { AddCourseTech } from "../../../core/services/api/post/Courses/AddCourseTech";
import { toast } from "react-toastify";
const AddTechModal = ({ isOpen, toggleTechModal, initialData, courseId }) => {
  const queryClient = useQueryClient();
  const { data: techData = [] } = useQuery({
    queryKey: ["GETALLTECHS"],
    queryFn: () => GetAllTechs(),
  });

  const techOptions = techData.map((tech) => ({
    value: tech.id,
    label: tech.techName,
  }));

  const [selectedValue, setSelectedValue] = useState([]);
  const [initialTechIds, setInitialTechIds] = useState([]);
  useEffect(() => {
    if (
      Array.isArray(initialData) &&
      initialData.length > 0 &&
      techData.length > 0
    ) {
      const filteredData = techData.filter((item) =>
        initialData.some((init) =>
          item.techName.trim().toLowerCase().includes(init.trim().toLowerCase())
        )
      );

      const initialOptions = filteredData.map((tech) => ({
        value: tech.id,
        label: tech.techName,
      }));

      setSelectedValue(initialOptions);
      setInitialTechIds(initialOptions.map((it) => it.value));
    }
  }, [initialData, techData]);

  const { mutate: AddTech, isPending } = useMutation({
    mutationKey: ["ADDTECH"],
    mutationFn: () => {
      const selectedIds = selectedValue.map((v) => v.value);
      const filteredIds = selectedIds.filter(
        (item) => !initialTechIds.includes(item)
      );
      if (filteredIds.length === 0) {
        toast.error("هیچ تکنولوژی جدیدی برای ارسال وجود ندارد.");
        return Promise.resolve();
      }
      return AddCourseTech(courseId, filteredIds);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message);
        toggleTechModal(false);
        queryClient.invalidateQueries(["COURSEBYID"]);
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleTechModal(false)}
      className="modal-dialog-centered"
      style={{ maxWidth: "450px" }}
    >
      <ModalBody>
        <p className="mb-1 pt-2 text-center fw-bold fs-5">
          افزودن تکنولوژی به دوره
        </p>

        <div className="mb-4">
          <Label className="form-label fw-semibold">تکنولوژی ها</Label>
          <Select
            isMulti
            options={techOptions}
            className="react-select"
            placeholder="تکنولوژی خود را انتخاب کنید..."
            classNamePrefix="select"
            value={selectedValue}
            onChange={(val) => setSelectedValue(val)}
            theme={selectThemeColors}
            noOptionsMessage={() =>
              selectedValue.length === techOptions.length
                ? "تمام تکنولوژی موجود انتخاب شده‌اند"
                : "هیچ گزینه‌ای موجود نیست"
            }
          />
        </div>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-between">
        <Button
          color="secondary"
          outline
          onClick={() => toggleTechModal(false)}
        >
          انصراف
        </Button>
        <Button onClick={() => AddTech()}>ارسال</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddTechModal;
