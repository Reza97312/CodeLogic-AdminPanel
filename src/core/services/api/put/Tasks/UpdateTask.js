import http from "../../../../interceptor/interceptor.js";
export const UpdateTask = async (payload) => {
  try {
    const result = await http.put("/AssistanceWork", payload);
    console.log(result);

    return result;
  } catch (err) {
    console.log(err);
  }
};
