import http from "../../../../interceptor/interceptor.js";
export const ActiveBuilding = async (payload) => {
  try {
    const result = await http.put("/Building/Active", payload);
    console.log(result);

    return result;
  } catch (err) {
    throw err;
  }
};
