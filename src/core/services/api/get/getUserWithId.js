import Http from '../../../interceptor/interceptor.js'

const getUserWithId = async (id) => {
  try {
    const result = await Http.get("/User/UserDetails/", {id});
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getUserWithId;
