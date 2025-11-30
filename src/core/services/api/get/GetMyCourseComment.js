import http from "../../../interceptor/interceptor.js";
export const GetMyCourseComment = async () => {
  try {
    const result = await http.get("/SharePanel/GetMyCoursesComments");
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
