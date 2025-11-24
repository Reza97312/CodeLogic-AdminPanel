import React from "react";
import http from "../../../interceptor/interceptor.js";
export const GetDashboardTechReport = async () => {
  try {
    const result = await http.get("/Report/DashboardTechnologyReport");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
