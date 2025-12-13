import http from "../../../../interceptor/interceptor.js";
export const CreateNewsCat = async (payload) => {
  try {
    const result = await http.post("/News/CreateNewsCategory", payload);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
