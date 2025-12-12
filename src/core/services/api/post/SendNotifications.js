import Http from "../../../interceptor/interceptor.js";

const SendNotifications = async (payload) => {
  try {
    const result = await Http.post("/v2/notification/alert/add", payload);

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default SendNotifications;
