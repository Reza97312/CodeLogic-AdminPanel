import Http from "../../../interceptor/interceptor.js";

const GetUserDetails = async (userId) => {
  try {
    const result = await Http.get(`/User/UserDetails/${userId}`);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetUserDetails;
