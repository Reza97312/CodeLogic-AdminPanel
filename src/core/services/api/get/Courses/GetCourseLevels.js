import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetCourseLevels = async () => {
  try {
    const result = await http.get("/CourseLevel/GetAllCourseLevel");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
