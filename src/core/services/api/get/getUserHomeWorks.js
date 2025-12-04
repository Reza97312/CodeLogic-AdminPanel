import Http from "../../../interceptor/interceptor.js";

const getUserHomeWorks = async (params) => {
  try {
    const result = await Http.get("/Session/GetSessionHomeWork");
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getUserHomeWorks;
