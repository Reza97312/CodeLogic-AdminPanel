import Http from "../../../../interceptor/interceptor";

const getNewsDetail = async (id) => {
  try {
    const result = await Http.get(`/News/${id}`);
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getNewsDetail;
