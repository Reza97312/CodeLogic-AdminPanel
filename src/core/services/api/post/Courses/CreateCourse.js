import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const CreateCourse = async (formdata) => {
  try {
    const result = await http.post("/Course", formdata);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
