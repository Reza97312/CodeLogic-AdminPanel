import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const AcceptCm = async (id) => {
  try {
    const result = await http.post(
      `/Course/AcceptCourseComment?CommentCourseId=${id}`,
      {}
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
