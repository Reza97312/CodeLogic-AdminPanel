import http from "../../../../interceptor/interceptor.js";
export const DeleteCourseGroup = (payload) => {
  try {
    const fd = new FormData();
    fd.append("Id", payload);
    const result = http.delete("/CourseGroup", {
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
