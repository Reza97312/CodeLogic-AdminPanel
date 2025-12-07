import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const PostCreateStatus = async (payload) => {
  try {
    const result = await http.post("/Status", payload);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
