import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetCreateCourse = async () => {
  try {
    const result = await http.get("/Course/GetCreate");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
