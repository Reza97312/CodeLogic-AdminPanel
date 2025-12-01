import http from "../../../../interceptor/interceptor.js";
export const UpdateAssistance = async (payload) => {
  try {
    const result = await http.put("/CourseAssistance", payload);
    console.log(result);

    return result;
  } catch (err) {
    console.log(err);
  }
};
