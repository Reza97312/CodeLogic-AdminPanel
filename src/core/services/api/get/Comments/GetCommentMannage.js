import React from "react";
import http from "../../../../interceptor/interceptor";
export const GetCommentMannage = async (params) => {
  try {
    const result = await http.get("/Course/CommentManagment", { params });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
