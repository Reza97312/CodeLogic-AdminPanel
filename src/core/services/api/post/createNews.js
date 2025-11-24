import http from '../../../interceptor/interceptor';

export const createNews = async (title, googleTitle, googleDescribe, miniDescribe, describe, keyword, isSlider, NewsCategoryId, image) => {
    try {
        const formData = new FormData();
        formData.append('Title', title);
        formData.append('GoogleTitle', googleTitle);
        formData.append('GoogleDescribe', googleDescribe);
        formData.append('MiniDescribe', miniDescribe);
        formData.append('Describe', describe);
        formData.append('Keyword', keyword);
        formData.append('IsSlider', isSlider);
        formData.append('GoogleTitle', googleTitle);
        formData.append('GoogleDescribe', googleDescribe);
        const result = await http.post(
            '/News/CreateNews',
            formData  
        );
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};