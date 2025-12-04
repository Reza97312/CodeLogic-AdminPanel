import http from "../../../../interceptor/interceptor.js";
export const postLoginInfo = async (payload) => {
  try {
    const result = await http.post("/Sign/Login", payload);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
