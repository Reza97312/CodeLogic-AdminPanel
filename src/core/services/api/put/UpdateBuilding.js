import Http from "../../../interceptor/interceptor";

const UpdateBuilding = async (payload) => {
  try {
    const result = await Http.put("/Building", payload);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default UpdateBuilding;
