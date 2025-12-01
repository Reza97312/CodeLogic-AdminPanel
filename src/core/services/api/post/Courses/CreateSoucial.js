import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const CreateSoucial = async (payload) => {
  try {
    const result = await http.post("/CourseSocialGroup", payload);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
