import Http from "../../../interceptor/interceptor";
const GetAdminSchedual = async () => {
  try {
    const result = await Http.get("/Schedual/GetAdminScheduals");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default GetAdminSchedual;
