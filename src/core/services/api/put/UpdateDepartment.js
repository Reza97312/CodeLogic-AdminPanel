import Http from "../../../interceptor/interceptor";

const UpdateDepartment = async (payload) => {
  try {
    const result = await Http.put("/Department", payload);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default UpdateDepartment;
