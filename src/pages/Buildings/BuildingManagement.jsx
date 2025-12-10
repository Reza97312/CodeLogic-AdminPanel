import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetAllBuildings } from "../../core/services/api/get/Buildings/GetAllBuildings";
import BuildingTable from "../../components/Buildings/BuildingsTable.js";
import Lottie from "lottie-react";
import infinity from "../../assets/images/icons/Infinity Loader.json";
const BuildingManagement = () => {
  const { data: alldata = [], isPending } = useQuery({
    queryKey: ["GETALLBUILDINGS"],
    queryFn: () => GetAllBuildings(),
  });
  return (
    <div>
      {isPending ? (
        <div className="d-flex flex-column align-items-center justify-content-center p-5 mt-5">
          <Lottie
            style={{ width: "200px", height: "200px" }}
            animationData={infinity}
          />
          <p>درحال بارگذاری اطلاعات...</p>
        </div>
      ) : (
        <BuildingTable buildingData={alldata} />
      )}
    </div>
  );
};

export default BuildingManagement;
