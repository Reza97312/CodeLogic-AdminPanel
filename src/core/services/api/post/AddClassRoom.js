import Http from "../../../interceptor/interceptor";

const AddClassRoom = async (payload) => {
  try {
    const result = await Http.post("/ClassRoom", payload);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default AddClassRoom;
