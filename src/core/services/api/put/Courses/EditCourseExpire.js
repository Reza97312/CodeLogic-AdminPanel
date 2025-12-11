import http from "../../../../interceptor/interceptor.js";
export const EditCourseExpire = async (payload) => {
  try {
    const result = await http.put("/Course/SetExpireCourse", payload);
    console.log(result);

    return result;
  } catch (err) {
    throw err;
  }
};
