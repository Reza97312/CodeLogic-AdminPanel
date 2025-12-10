import Http from "../../../interceptor/interceptor";

const AddBuilding = async (payload) => {
  try {
    const result = await Http.post("/Building", payload);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default AddBuilding;
