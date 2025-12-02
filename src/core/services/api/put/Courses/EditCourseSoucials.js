import http from "../../../../interceptor/interceptor.js";
export const EditCourseSoucials = async (payload) => {
  try {
    const result = await http.put("/CourseSocialGroup", payload);
    console.log(result);

    return result;
  } catch (err) {
    console.log(err);
  }
};
