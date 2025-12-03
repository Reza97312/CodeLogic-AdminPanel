import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetAllGroups = async () => {
  try {
    const result = await http.get("/CourseGroup");

    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
