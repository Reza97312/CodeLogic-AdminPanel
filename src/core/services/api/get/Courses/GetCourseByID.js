import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetCourseById = async (id) => {
  try {
    const result = await http.get(`/Course/${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
