import http from "../../../interceptor/interceptor.js";
export const GetUserPayment = async (params) => {
  try {
    const result = await http.get("/CoursePayment/UserPayList", { params });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
