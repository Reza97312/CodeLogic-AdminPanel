import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const GetTerms = async () => {
  try {
    const result = await http.get("/Term");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
