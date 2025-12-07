import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const PostCreateTech = async (payload) => {
  try {
    const result = await http.post("/Technology", payload);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
