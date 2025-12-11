import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Label,
  Col,
} from "reactstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import UpdateBuilding from "../../core/services/api/put/UpdateBuilding";
import "leaflet/dist/leaflet.css";

const MaplifEdit = ({ setEditBuilding, editBuilding }) => {
  const map = useMap();

  const safeParseLat = parseFloat(editBuilding.latitude);
  const safeParseLng = parseFloat(editBuilding.longitude);

  const initialPosition =
    !isNaN(safeParseLat) && !isNaN(safeParseLng)
      ? [safeParseLat, safeParseLng]
      : null;

  const [markerPosition, setMarkerPosition] = useState(initialPosition);

  useEffect(() => {
    setMarkerPosition(initialPosition);

    if (initialPosition) {
      map.flyTo(initialPosition, map.getZoom() || 10, { duration: 1.5 });
    }
  }, [editBuilding.latitude, editBuilding.longitude, map]);

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);

      map.flyTo([lat, lng], map.getZoom(), {
        duration: 1.5,
      });

      setEditBuilding((prev) => ({
        ...prev,
        latitude: lat.toFixed(6).toString(),
        longitude: lng.toFixed(6).toString(),
      }));
    },
  });

  return markerPosition ? (
    <Marker position={markerPosition}>
      <Popup>موقعیت ویرایش شده ساختمان</Popup>
    </Marker>
  ) : null;
};

const EditBuildingModal = ({ isOpen, toggle, editData }) => {
  const queryClient = useQueryClient();
  const [editBuilding, setEditBuilding] = useState({
    id: "",
    buildingName: "",
    floor: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (editData) {
      setEditBuilding({
        id: editData.id || "",
        buildingName: editData.buildingName || "",

        floor: editData.floor?.toString() || "",

        latitude: editData.latitude || "",
        longitude: editData.longitude || "",
      });
    }
  }, [editData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBuilding((prev) => ({ ...prev, [name]: value }));
  };

  const updateBuildingMutation = useMutation({
    mutationFn: UpdateBuilding,
    onSuccess: () => {
      toast.success("ساختمان با موفقیت ویرایش شد");
      toggle(false);

      queryClient.invalidateQueries(["GETALLBUILDINGS"]);
    },
    onError: (error) => {
      toast.error("خطا در ویرایش ساختمان");
    },
  });

  const handleEditBuildingSubmit = (e) => {
    e.preventDefault();

    const { id, buildingName, floor, latitude, longitude } = editBuilding;

    if (!buildingName || !floor || !latitude || !longitude) {
      toast.warn("لطفا اطلاعات خود را تکمیل کنید");
      return;
    }

    const payload = {
      id: id,
      buildingName: buildingName,

      floor: parseInt(floor, 10),
      latitude: latitude,
      longitude: longitude,
    };

    updateBuildingMutation.mutate(payload);
  };

  const mapCenterLat = parseFloat(editBuilding.latitude);
  const mapCenterLng = parseFloat(editBuilding.longitude);

  const defaultCenter = [35.72, 51.38];

  const mapInitialCenter =
    !isNaN(mapCenterLat) && !isNaN(mapCenterLng)
      ? [mapCenterLat, mapCenterLng]
      : defaultCenter;

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle(false)}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={() => toggle(false)}>ویرایش ساختمان</ModalHeader>
      <Form onSubmit={handleEditBuildingSubmit}>
        <ModalBody>
          <Label for="buildingName">نام ساختمان</Label>
          <Input
            type="text"
            id="buildingName"
            name="buildingName"
            value={editBuilding.buildingName}
            onChange={handleInputChange}
            className="mb-2"
          />

          <Label for="floor">تعداد طبقات</Label>
          <Input
            type="number"
            id="floor"
            name="floor"
            value={editBuilding.floor}
            onChange={handleInputChange}
            className="mb-2"
          />

          <Label for="latitude">عرض جغرافیایی</Label>
          <Input
            type="text"
            id="latitude"
            name="latitude"
            value={editBuilding.latitude}
            onChange={handleInputChange}
            className="mb-2"
          />

          <Label for="longitude">طول جغرافیایی</Label>
          <Input
            type="text"
            id="longitude"
            name="longitude"
            value={editBuilding.longitude}
            onChange={handleInputChange}
            className="mb-2"
          />

          <Col md="12">
            <div style={{ height: "200px", width: "100%" }}>
              <MapContainer
                center={mapInitialCenter}
                zoom={10}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                className="rounded-3"
                preferCanvas={true}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MaplifEdit
                  setEditBuilding={setEditBuilding}
                  editBuilding={editBuilding}
                />
              </MapContainer>
            </div>
          </Col>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            disabled={updateBuildingMutation.isLoading}
          >
            {updateBuildingMutation.isLoading
              ? "درحال ویرایش..."
              : "تأیید ویرایش"}
          </Button>
          <Button
            color="secondary"
            onClick={() => toggle(false)}
            disabled={updateBuildingMutation.isLoading}
          >
            لغو
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EditBuildingModal;
