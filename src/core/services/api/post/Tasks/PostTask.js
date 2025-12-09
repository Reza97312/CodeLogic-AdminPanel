import http from "../../../../interceptor/interceptor.js";
export const PostTask = async (payload) => {
  try {
    const result = await http.post("/AssistanceWork", payload);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
