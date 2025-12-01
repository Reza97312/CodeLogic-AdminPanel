import http from "../../../../interceptor/interceptor.js";
export const EditCourse = async (formdata) => {
  try {
    const result = await http.put("/Course", formdata);
    console.log(result);

    return result;
  } catch (err) {
    throw err;
  }
};
