import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetAllBuildings = async () => {
  try {
    const result = await http.get("/Building");

    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
