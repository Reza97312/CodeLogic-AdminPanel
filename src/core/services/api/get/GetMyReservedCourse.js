import http from "../../../interceptor/interceptor.js";
export const GetMyReservedCourse = async () => {
  try {
    const result = await http.get("/SharePanel/GetMyCoursesReserve");
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
