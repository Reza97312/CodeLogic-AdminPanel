import Http from "../../../interceptor/interceptor";
const GetBuliding = async () => {
  try {
    const result = await Http.get("/Building");
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetBuliding;
