import http from "../../../../interceptor/interceptor.js";
export const UpdateStatus = async (payload) => {
  try {
    const fd = new FormData();
    fd.append("CourseId", payload.CourseId);
    fd.append("StatusId", payload.StatusId);
    const result = await http.put("/Course/UpdateCourseStatus", fd);
    console.log(result);

    return result;
  } catch (err) {
    console.log(err);
  }
};
