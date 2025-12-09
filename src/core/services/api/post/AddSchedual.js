import http from "../../../interceptor/interceptor";
export const AddSchedual = async (payload, courseId) => {
  try {
    const result = await http.post(
      `/Schedual/AddSchedualSingle?currentCurseId=${courseId}`,
      payload
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
