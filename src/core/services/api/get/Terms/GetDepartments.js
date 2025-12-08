import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const GetDepartments = async () => {
  try {
    const result = await http.get("/Department");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
