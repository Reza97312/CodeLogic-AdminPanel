import Http from "../../../interceptor/interceptor";
const GetDepartment = async () => {
  try {
    const result = await Http.get("/Department");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default GetDepartment;
