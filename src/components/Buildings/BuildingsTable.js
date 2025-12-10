import { Fragment, useState } from "react";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  CardHeader,
} from "reactstrap";
import "leaflet/dist/leaflet.css";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BuildingCol } from "./BuildingCols";
import MapModal from "./MapModal";
import BuildActiveModal from "./BuildActiveModal";
import BuildingDetailModal from "./BuildingDetailModal";
import AddBuilding from "../../core/services/api/post/AddBuilding";
import EditBuildingModal from "./EditBuildingModal";

const Maplif = ({ setNewBuilding, newBuilding }) => {
  const map = useMap();

  const initialPosition =
    newBuilding.latitude && newBuilding.longitude
      ? [parseFloat(newBuilding.latitude), parseFloat(newBuilding.longitude)]
      : null;
  const [markerPosition, setMarkerPosition] = useState(
    newBuilding.latitude && newBuilding.longitude
      ? [parseFloat(newBuilding.latitude), parseFloat(newBuilding.longitude)]
      : null
  );

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);

      map.flyTo([lat, lng], map.getZoom(), {
        duration: 1.5,
      });

      setNewBuilding((prev) => ({
        ...prev,
        latitude: lat.toFixed(6).toString(),
        longitude: lng.toFixed(6).toString(),
      }));
    },
  });

  return markerPosition ? (
    <Marker position={markerPosition}>
      <Popup>موقعیت جدید ساختمان</Popup>
    </Marker>
  ) : null;
};

const BuildingTable = ({ buildingData }) => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openAdd, setOpenAdd] = useState(false);
  const [newBuilding, setNewBuilding] = useState({
    buildingName: "",
    floor: "",
    latitude: "",
    longitude: "",
  });
  const toggleAdd = () => setOpenAdd(!openAdd);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBuilding((prev) => ({ ...prev, [name]: value }));
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
    window.scrollTo(0, 0);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = buildingData?.slice(startIndex, endIndex);
  const [openMap, setOpenMap] = useState(false);
  const [mapData, setMapData] = useState(null);
  const toggleMap = (bool) => setOpenMap(bool);
  const handleMap = (vals) => setMapData(vals);
  const [editData, setEditData] = useState("");
  const handleEdit = (vals) => setEditData(vals);
  const [openActive, setOpenActive] = useState(false);
  const toggleActive = (boool) => setOpenActive(boool);
  const [openDetail, setOpenDetail] = useState(false);
  const toggleDetail = (bool) => setOpenDetail(bool);
  const [detailData, setDetailData] = useState(null);
  const handleDetail = (vals) => setDetailData(vals);
  const [openEdit, setOpenEdit] = useState(false);
  const toggleEdit = (bool) => setOpenEdit(bool);

  const addBuildingMutation = useMutation({
    mutationFn: AddBuilding,
    onSuccess: () => {
      toast.success("ساختمان با موفقیت اضافه شد");
      toggleAdd();
      setNewBuilding({
        buildingName: "",
        floor: "",
        latitude: "",
        longitude: "",
      });
      queryClient.invalidateQueries(["GETALLBUILDINGS"]);
    },
    onError: () => {
      toast.error("خطا در افزودن ساختمان");
    },
  });

  const handleAddBuildingSubmit = (e) => {
    e.preventDefault();

    const { buildingName, floor, latitude, longitude } = newBuilding;

    if (!buildingName || !floor || !latitude || !longitude) {
      toast.warn("لطفا اطلاعات خود را تکمیل کنید");
      return;
    }

    const payload = {
      ...newBuilding,
      floor: parseInt(newBuilding.floor, 10),
    };

    addBuildingMutation.mutate(payload);
  };

  const tableColumns = BuildingCol({
    toggleMap,
    handleEdit,
    toggleActive,
    toggleDetail,
    handleDetail,
    handleMap,
    toggleEdit,
  });
  const CustomPagination = () => {
    const count = Math.ceil((buildingData?.length || 0) / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count}
        activeClassName="active"
        onPageChange={handlePagination}
        forcePage={currentPage - 1}
        containerClassName="pagination react-paginate justify-content-end mt-2"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        nextClassName="page-item next"
        nextLinkClassName="page-link"
        previousClassName="page-item prev"
        previousLinkClassName="page-link"
      />
    );
  };

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <CardHeader tag="h4">
          <p>مدیریت ساختمان ها</p>
          <Button color="primary" onClick={toggleAdd}>
            افزودن ساختمان
          </Button>
        </CardHeader>
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            sortServer
            responsive
            columns={tableColumns}
            sortIcon={<ChevronDown />}
            data={currentData}
            onSort={handleSort}
            paginationComponent={CustomPagination}
          />
        </div>
      </Card>

      <MapModal isOpen={openMap} toggle={toggleMap} mapData={mapData} />

      {openActive && (
        <BuildActiveModal
          isOpen={openActive}
          toggle={toggleActive}
          editData={editData}
        />
      )}

      {openDetail && (
        <BuildingDetailModal
          isOpen={openDetail}
          toggle={toggleDetail}
          detailData={detailData}
        />
      )}

      {openEdit && (
        <EditBuildingModal
          isOpen={openEdit}
          toggle={toggleEdit}
          editData={editData}
        />
      )}

      <Modal
        isOpen={openAdd}
        toggle={toggleAdd}
        className="modal-dialog-centered "
      >
        <ModalHeader toggle={toggleAdd}>افزودن ساختمان جدید</ModalHeader>
        <Form onSubmit={handleAddBuildingSubmit}>
          <ModalBody>
            <Label for="buildingName">نام ساختمان</Label>
            <Input
              type="text"
              id="buildingName"
              name="buildingName"
              value={newBuilding.buildingName}
              onChange={handleInputChange}
              className="mb-2"
            />

            <Label for="floor">تعداد طبقات</Label>
            <Input
              type="number"
              id="floor"
              name="floor"
              value={newBuilding.floor}
              onChange={handleInputChange}
              className="mb-2"
            />

            <Label for="latitude">عرض جغرافیایی </Label>
            <Input
              type="text"
              id="latitude"
              name="latitude"
              value={newBuilding.latitude}
              onChange={handleInputChange}
              className="mb-2"
            />

            <Label for="longitude">طول جغرافیایی</Label>
            <Input
              type="text"
              id="longitude"
              name="longitude"
              value={newBuilding.longitude}
              onChange={handleInputChange}
              className="mb-2"
            />

            <Col md="12">
              <div style={{ height: "200px", width: "100%" }}>
                <MapContainer
                  center={[35.72, 51.38]}
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
                  <Maplif
                    setNewBuilding={setNewBuilding}
                    newBuilding={newBuilding}
                  />
                </MapContainer>
              </div>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              disabled={addBuildingMutation.isLoading}
            >
              {addBuildingMutation.isLoading ? "درحال ثبت..." : "ثبت"}
            </Button>
            <Button
              color="secondary"
              onClick={toggleAdd}
              disabled={addBuildingMutation.isLoading}
            >
              لغو
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default BuildingTable;
