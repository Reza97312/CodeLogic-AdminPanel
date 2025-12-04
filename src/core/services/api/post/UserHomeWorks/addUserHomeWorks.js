import http from '../../../../interceptor/interceptor';

export const addUserHomeWorks = async (homeWorkTitle, homeWorkDescribe, sessionId) => {
    try {
        const formData = new FormData();
        formData.append('hwTitle', homeWorkTitle);
        formData.append('hwDescribe', homeWorkDescribe);
        formData.append('sessionId', sessionId);
        const result = await http.post(
            '/Session/AddSessionHomeWork',
            formData  
        );
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};