import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetAllTasks = async () => {
  try {
    const result = await http.get("/AssistanceWork");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
