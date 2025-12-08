import http from "../../../../interceptor/interceptor.js";
export const UpdateTerm = async (payload) => {
  try {
    const result = await http.put("/Term", payload);
    console.log(result);

    return result;
  } catch (err) {
    console.log(err);
  }
};
