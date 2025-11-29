import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetCourseStatus = async () => {
  try {
    const result = await http.get("/Status");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
