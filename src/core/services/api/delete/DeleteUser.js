import Http from "../../../interceptor/interceptor.js";

const DeleteUser = async (payload) => {
  try {
    const result = await Http.delete("/User/DeleteUser", { data: payload });

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default DeleteUser;
