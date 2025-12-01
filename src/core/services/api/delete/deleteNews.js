import http from '../../../interceptor/interceptor.js';


export const deleteNews = async (fileId) => {
    try {
        const result = await http.delete(`/News/DeleteNewsFile?fileId=${fileId}`);
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
