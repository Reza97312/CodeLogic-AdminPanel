import http from "../../../interceptor/interceptor.js";
export const UpdateUser = async (payload) => {
  try {
    const result = await http.put("/User/UpdateUser", payload);
    return result;
  } catch (err) {
    throw err;
  }
};
