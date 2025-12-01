import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetCourseSoucial = async () => {
  try {
    const result = await http.get("/CourseSocialGroup");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
