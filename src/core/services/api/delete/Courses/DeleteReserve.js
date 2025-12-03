import { data } from "jquery";
import http from "../../../../interceptor/interceptor.js";
export const DeleteReserve = (payload) => {
  try {
    const result = http.delete("/CourseReserve", {
      data: payload,
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
