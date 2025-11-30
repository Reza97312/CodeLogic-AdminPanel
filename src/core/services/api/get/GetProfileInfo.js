import http from "../../../interceptor/interceptor.js";
export const GetProfileInfo = async () => {
  try {
    const result = await http.get("/SharePanel/GetProfileInfo");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
