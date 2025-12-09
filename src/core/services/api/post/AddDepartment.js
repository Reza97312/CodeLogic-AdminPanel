import Http from "../../../interceptor/interceptor";

const AddDepartment = async (payload) => {
  try {
    const result = await Http.post("/Department", payload);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default AddDepartment;
