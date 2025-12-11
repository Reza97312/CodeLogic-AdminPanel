import Http from '../../../../interceptor/interceptor';

const getNews = async () => {
    try {
        const result = await Http.get('/News');
        return result;
    } catch (error) {
        console.log(error);
    }
};

export default getNews;
