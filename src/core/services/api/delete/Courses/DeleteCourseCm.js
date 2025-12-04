import http from "../../../../interceptor/interceptor.js";
export const DeleteCourseCm = (id) => {
  try {
    const result = http.delete("/Course/DeleteCourseComment", {
      params: {
        CourseCommandId: id,
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
