import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useQuery } from "@tanstack/react-query";
import GetBuildingDetails from "../../core/services/api/get/Buildings/GetBuildingDetails";
import { Globe } from "react-feather";
import Lottie from "lottie-react";
import infinity from "../../assets/images/icons/Infinity Loader.json";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapModal = ({ isOpen, toggle, mapData }) => {
  const buildingId = mapData?.id;

  const { data, isPending, isError } = useQuery({
    queryKey: ["GetBuildingDetails", buildingId],
    queryFn: () => GetBuildingDetails(buildingId),
    enabled: !!buildingId && isOpen,
    staleTime: 60000,
  });

  const defaultCenter = [35.6892, 51.389];

  const lat = parseFloat(data?.latitude);
  const lng = parseFloat(data?.longitude);

  const hasCoords = !isPending && !isError && lat && lng;
  const center = hasCoords ? [lat, lng] : defaultCenter;

  const mapKey = hasCoords ? `map-${lat}-${lng}` : "map-default";

  if (isPending) {
    return (
      <Modal
        isOpen={isOpen}
        toggle={() => toggle(false)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => toggle(false)}>نشانی ساختمان</ModalHeader>
        <ModalBody className="text-center d-flex flex-column align-items-center justify-content-center p-5">
          <Lottie
            style={{ width: 200, height: 200 }}
            animationData={infinity}
          />
          <p className="mt-2">درحال دریافت اطلاعات مختصات...</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => toggle(false)}>
            خروج
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle(false)}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={() => toggle(false)}>
        نشانی ساختمان: {mapData?.buildingName}
      </ModalHeader>

      <ModalBody>
        <Row className="mb-3">
          <Col md="6">
            <Label className="form-label">
              <Globe size={14} className="me-1" />
              عرض جغرافیایی
            </Label>
            <Input value={data?.latitude || ""} readOnly disabled />
          </Col>

          <Col md="6">
            <Label className="form-label">
              <Globe size={14} className="me-1" />
              طول جغرافیایی
            </Label>
            <Input value={data?.longitude || ""} readOnly disabled />
          </Col>
        </Row>

        <div style={{ height: 200 }}>
          <MapContainer
            key={mapKey}
            center={center}
            zoom={13}
            scrollWheelZoom
            className="rounded-3"
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {hasCoords && (
              <Marker position={center}>
                <Popup>{mapData?.buildingName}</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button color="danger" onClick={() => toggle(false)}>
          خروج
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MapModal;
