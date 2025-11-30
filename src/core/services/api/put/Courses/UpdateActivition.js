import http from "../../../../interceptor/interceptor.js";
export const UpdateActivition = async (payload) => {
  try {
    const result = await http.put("/Course/ActiveAndDeactiveCourse", payload);
    console.log(result);

    return result;
  } catch (err) {
    throw err;
  }
};
