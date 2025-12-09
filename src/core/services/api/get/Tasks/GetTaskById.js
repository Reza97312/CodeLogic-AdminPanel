import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetTaskById = async (id) => {
  try {
    const result = await http.get(`/AssistanceWork/${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
