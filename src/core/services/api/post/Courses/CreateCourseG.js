import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const CreateCourseG = async (payload) => {
  try {
    const fd = new FormData();
    fd.append("GroupName", payload.GroupName);
    fd.append("CourseId", payload.CourseId);
    fd.append("GroupCapacity", payload.GroupCapacity);
    const result = await http.post("/CourseGroup", fd);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
