import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const CreateCourseLevel = async (payload) => {
  try {
    const result = await http.post("/CourseLevel", payload);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
