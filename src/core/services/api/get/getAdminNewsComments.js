import Http from '../../../interceptor/interceptor';

const getNews = async (id) => {
    try {
        const result = await Http.get(`/News/GetAdminNewsComments?NewsId=${id}`);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export default getNews;
