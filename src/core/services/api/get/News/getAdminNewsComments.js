import Http from "../../../../interceptor/interceptor";

const getAdminNewsComments = async (id) => {
  try {
    const result = await Http.get(`/News/GetAdminNewsComments?NewsId=${id}`);
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getAdminNewsComments;
