import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetCourseAssistance = async () => {
  try {
    const result = await http.get("/CourseAssistance");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
