import React from "react";
import http from "../../../interceptor/interceptor.js";
export const GetDashboardReport = async () => {
  try {
    const result = await http.get("/Report/DashboardReport");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
