import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetAllCourses = async (params) => {
  try {
    const result = await http.get("/Course/CourseList", { params });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
