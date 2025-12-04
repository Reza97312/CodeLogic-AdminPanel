import http from "../../../../interceptor/interceptor.js";
export const GetCourseReserved = async () => {
  try {
    const result = await http.get("/CourseReserve");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
