import Http from "../../../interceptor/interceptor.js";

const AddUser = async (payload) => {
  try {
    const result = await Http.post("/User/CreateUser", payload);

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default AddUser;
