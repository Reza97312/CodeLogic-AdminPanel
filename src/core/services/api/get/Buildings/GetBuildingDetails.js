import http from "../../../../interceptor/interceptor";
const GetBuildingDetails = async (id) => {
  try {
    const result = await http.get(`/Building/${id}`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetBuildingDetails;
