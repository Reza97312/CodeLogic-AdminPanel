import http from "../../../interceptor/interceptor";

export const UpdateSchedual = async (payload) => {
  try {
    const result = await http.put("/Schedual/LockToRiase", payload);
    console.log(result);

    return result;
  } catch (err) {
    console.log(err);
  }
};

export default UpdateSchedual;
