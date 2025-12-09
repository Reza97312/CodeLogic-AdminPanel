import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetTermById = async (id) => {
  try {
    const result = await http.get(`/Term/${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
