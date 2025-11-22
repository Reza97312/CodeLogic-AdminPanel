import Http from '../../../interceptor/interceptor';

const getNews = async (params) => {
    try {
        const result = await Http.get('/News', { params });
        return result;
    } catch (error) {
        console.log(error);
    }
};

export default getNews;
