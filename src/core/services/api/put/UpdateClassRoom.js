import Http from "../../../interceptor/interceptor";
const UpdateClassRoom = async (payload) => {
  try {
    const result = await Http.put("/ClassRoom", payload);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default UpdateClassRoom;
