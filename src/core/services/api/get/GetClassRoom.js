import Http from "../../../interceptor/interceptor";
const GetClassRoom = async () => {
  try {
    const result = await Http.get("/ClassRoom");
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetClassRoom;
