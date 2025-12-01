import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetCourseGroups = async (param) => {
  try {
    const result = await http.get("/CourseGroup/GetCourseGroup", {
      params: {
        TeacherId: param.teacher,
        CourseId: param.course,
      },
    });

    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
