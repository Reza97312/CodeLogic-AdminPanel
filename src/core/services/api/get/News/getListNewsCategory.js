import Http from '../../../../interceptor/interceptor.js'

const getListNewsCategory = async () => {
    try{
        const result = await Http.get('/News/GetListNewsCategory');
        return result;
    }
    catch(error){
        console.log(error)
    }
}

export default getListNewsCategory