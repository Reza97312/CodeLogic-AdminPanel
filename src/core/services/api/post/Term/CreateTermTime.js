import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const PostCreateTime = async (payload) => {
  try {
    const result = await http.post("/Term/AddTermCloseDate", payload);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
