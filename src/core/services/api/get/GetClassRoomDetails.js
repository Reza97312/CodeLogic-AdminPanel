import http from "../../../interceptor/interceptor";

const GetClassRoomDetails = async (id) => {
  try {
    const result = await http.get(`/ClassRoom/${id}`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetClassRoomDetails;
