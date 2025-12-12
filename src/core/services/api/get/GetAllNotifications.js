import http from "../../../interceptor/interceptor.js";
export const GetAllNotifications = async () => {
  try {
    const result = await http.get("/v2/notification/alert/mineAll");
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
