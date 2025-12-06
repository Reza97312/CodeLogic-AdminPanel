import React from "react";
import http from "../../../../interceptor/interceptor.js";
export const GetCommentsReply = async ({ CourseId, CommentId }) => {
  try {
    console.log("SENT PARAMS --->", { CourseId, CommentId });
    const result = await http.get(
      `/Course/GetCourseReplyCommnets/${CourseId}/${CommentId}`
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
