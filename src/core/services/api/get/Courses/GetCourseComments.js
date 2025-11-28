import http from "../../../../interceptor/interceptor.js";
export const GetCourseComments = async (id) => {
  try {
    const result = await http.get(`/Course/GetCourseCommnets/${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
