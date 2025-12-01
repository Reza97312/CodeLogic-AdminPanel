import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const UpdateCourseGroup = async (payload) => {
  try {
    const fd = new FormData();
    fd.append("Id", payload.Id);
    fd.append("GroupName", payload.GroupName);
    fd.append("CourseId", payload.CourseId);
    fd.append("GroupCapacity", payload.GroupCapacity);
    const result = await http.put("/CourseGroup", fd);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
