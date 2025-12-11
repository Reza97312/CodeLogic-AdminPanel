import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Badge,
  CardBody,
  Col,
} from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import GetBuildingDetails from "../../core/services/api/get/Buildings/GetBuildingDetails";
import { Activity, Clipboard, Globe, Layers } from "react-feather";

const BuildingDetailModal = ({ isOpen, toggle, detailData }) => {
  const buildingId = detailData?.id;

  const { data: buildingDetails } = useQuery({
    queryKey: ["GetBuildingDetails", buildingId],
    queryFn: () => GetBuildingDetails(buildingId),
  });

  const data = buildingDetails ?? [];

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle(false)}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={() => toggle(false)}>جزئیات ساختمان</ModalHeader>
      <ModalBody>
        <CardBody className="px-2 mt-2">
          <Col>
            <div className="row g-2 mb-2 small justify-content-around text-center">
              <div className="col-4">
                <h6 className="text-secondary fw-bold mb-1 text-nowrap">
                  <Clipboard size={14} style={{ marginInlineEnd: "6px" }} />
                  نام ساختمان :
                </h6>
                <Badge
                  style={{ padding: "10px", fontSize: "13px" }}
                  pill
                  className="bg-light-info text-info mb-1"
                >
                  {data?.buildingName}
                </Badge>
              </div>

              <div className="col-4">
                <h6 className="text-secondary fw-bold mb-1 text-nowrap">
                  <Layers size={14} style={{ marginInlineEnd: "6px" }} />
                  طبقه ساختمان :
                </h6>
                <Badge
                  style={{ padding: "10px", fontSize: "13px" }}
                  pill
                  className="bg-light-info text-info mb-1"
                >
                  {data?.floor} طبقه
                </Badge>
              </div>
            </div>
          </Col>
          <Col>
            <div className="row g-2 mb-2 small justify-content-around text-center">
              <div className="col-4">
                <h6 className="text-secondary fw-bold mb-1 text-nowrap">
                  <Globe size={14} style={{ marginInlineEnd: "6px" }} />
                  عرض جغرافیایی :
                </h6>
                <Badge
                  style={{ padding: "10px", fontSize: "13px" }}
                  pill
                  className="bg-light-info text-info mb-1"
                >
                  {data?.latitude}
                </Badge>
              </div>

              <div className="col-4">
                <h6 className="text-secondary fw-bold mb-1 text-nowrap">
                  <Globe size={14} style={{ marginInlineEnd: "6px" }} />
                  طول جغرافیایی :
                </h6>
                <Badge
                  style={{ padding: "10px", fontSize: "13px" }}
                  pill
                  className="bg-light-info text-info mb-1"
                >
                  {data?.longitude}
                </Badge>
              </div>
            </div>
          </Col>
          <div>
            <h6 className="text-secondary fw-bold mb-1 text-nowrap d-flex justify-content-center">
              <Activity size={14} style={{ marginInlineEnd: "6px" }} />
              وضعیت ساختمان :
            </h6>
            <Badge
              style={{ padding: "10px", fontSize: "13px", textAlign: "center" }}
              pill
              className={`mb-1 d-flex justify-content-center w-20 ${
                data?.active
                  ? "bg-light-success text-success"
                  : "bg-light-danger text-danger"
              }`}
            >
              {data?.active ? "فعال" : "غیرفعال"}
            </Badge>
          </div>
        </CardBody>
      </ModalBody>
    </Modal>
  );
};

export default BuildingDetailModal;
