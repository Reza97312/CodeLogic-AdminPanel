import Http from "../../../interceptor/interceptor.js";

const GetAllUser = async (params) => {
  try {
    const result = await Http.get("/User/UserMannage", { params });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetAllUser;
