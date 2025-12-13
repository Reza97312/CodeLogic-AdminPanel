import http from "../../../../interceptor/interceptor.js";
export const CreateNews = async (payload) => {
  try {
    const result = await http.post("/News/CreateNews", payload);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
