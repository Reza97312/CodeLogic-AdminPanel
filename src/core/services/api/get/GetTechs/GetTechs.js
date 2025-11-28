import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetAllTechs = async () => {
  try {
    const result = await http.get("/Home/GetTechnologies");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
