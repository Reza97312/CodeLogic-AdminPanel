import http from "../../../../interceptor/interceptor.js";
export const EditNewsCat = async (payload) => {
  try {
    const result = await http.put("/News/UpdateNewsCategory", payload);
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};
