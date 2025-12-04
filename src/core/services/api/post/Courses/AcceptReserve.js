import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const AcceptReserve = async (payload) => {
  try {
    const result = await http.post(
      "/CourseReserve/SendReserveToCourse",
      payload
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
