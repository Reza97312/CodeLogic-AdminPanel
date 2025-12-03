import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const AddCourseTech = async (courseId, selectedValue) => {
  try {
    const body = selectedValue.map((item) => ({ techId: item }));
    const result = await http.post(
      `/Course/AddCourseTechnology?courseId=${courseId}`,
      body
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
