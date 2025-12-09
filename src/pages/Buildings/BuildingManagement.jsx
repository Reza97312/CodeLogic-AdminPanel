import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetAllBuildings } from "../../core/services/api/get/Buildings/GetAllBuildings";
import loading from "../../assets/images/A/loading.gif";
import BuildingTable from "../../components/Buildings/BuildingsTable.js";
const BuildingManagement = () => {
  const { data: alldata = [], isPending } = useQuery({
    queryKey: ["GETALLBUILDINGS"],
    queryFn: () => GetAllBuildings(),
  });
  return (
    <div>
      {isPending ? (
        <img src={loading} style={{ margin: "0 auto" }} />
      ) : (
        <BuildingTable buildingData={alldata} />
      )}
    </div>
  );
};

export default BuildingManagement;
