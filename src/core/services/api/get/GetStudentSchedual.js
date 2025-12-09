import Http from "../../../interceptor/interceptor";

const GetStudentSchedual = async (studentId) => {
  try {
    const result = await Http.get(
      `/Schedual/GetStudentScheduals?StudentId=${studentId}`
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetStudentSchedual;
