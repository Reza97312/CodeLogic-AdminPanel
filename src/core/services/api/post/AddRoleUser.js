import Http from "../../../interceptor/interceptor.js";

const AddRoleUser = async (payload) => {
  try {
    const result = await Http.post("/User/AddUserAccess", payload);

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default AddRoleUser;
