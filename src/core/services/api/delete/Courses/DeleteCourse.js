import http from "../../../../interceptor/interceptor.js";
export const DeleteCourse = (value) => {
  try {
    const result = http.delete("/Course/DeleteCourse", {
      active: value.active,
      id: value.courseId,
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
