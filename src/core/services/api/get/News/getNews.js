import Http from "../../../../interceptor/interceptor";

const getNews = async (params) => {
  try {
    const result = await Http.get("/News", {
      params: params,
    });
    console.log(result);

    return result;
  } catch (err) {
    throw err;
  }
};

export default getNews;
