import Http from "../../../interceptor/interceptor";
const GetTeacherSchedual = async () => {
  try {
    const result = await Http.get("/Schedual/GetTeacherScheduals");
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetTeacherSchedual;
