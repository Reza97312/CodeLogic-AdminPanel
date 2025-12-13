import http from "../../../../interceptor/interceptor.js";
export const ActiveNews = async (payload) => {
  try {
    const result = await http.put("/News/ActiveDeactiveNews", payload);
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};
