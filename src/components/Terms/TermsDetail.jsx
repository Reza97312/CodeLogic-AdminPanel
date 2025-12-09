import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Badge,
} from "reactstrap";
import loading from "../../assets/images/A/loading.gif";
import { PersianDateConverter } from "../../utility/helper/PersianDateConverter";
import { GetTermById } from "../../core/services/api/get/Terms/GetTermById.js";
import { useQuery } from "@tanstack/react-query";
const TermDetailsModal = ({ isOpen, toggle, id }) => {
  const { data: detail = {}, isPending } = useQuery({
    queryKey: ["TERMDETAIL"],
    queryFn: () => GetTermById(id),
  });
  return (
    <Modal isOpen={isOpen} toggle={() => toggle(false)} size="md">
      <ModalHeader toggle={() => toggle(false)}>جزییات ترم</ModalHeader>
      <ModalBody>
        {isPending ? (
          <img src={loading} className="mx-auto" />
        ) : (
          <>
            <div className="mb-3">
              <strong>نام ترم:</strong>
              <div className="mt-1 fs-5">{detail.termName}</div>
            </div>

            <div className="mb-3">
              <strong>تاریخ شروع:</strong>
              <div className="mt-1">
                {PersianDateConverter(detail.startDate)}
              </div>
            </div>

            <div className="mb-3">
              <strong>تاریخ پایان:</strong>
              <div className="mt-1">{PersianDateConverter(detail.endDate)}</div>
            </div>

            <div className="mb-3">
              <strong>وضعیت:</strong>
              <div className="mt-2">
                <Badge color={detail.expire ? "danger" : "success"} pill>
                  {detail.expire ? "منقضی شده" : "فعال"}
                </Badge>
              </div>
            </div>

            <div
              className="p-3 rounded mt-3"
              style={{
                background: "#f9fafb",
                border: "1px dashed #d0d7de",
              }}
            >
              <div className="text-muted" style={{ fontSize: "13px" }}>
                این اطلاعات مربوط به ترم انتخاب شده است.
              </div>
            </div>
          </>
        )}
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={() => toggle(false)}>
          بستن
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TermDetailsModal;
