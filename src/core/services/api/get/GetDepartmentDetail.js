import http from "../../../interceptor/interceptor";

const GetDepartmentDetail = async (id) => {
  try {
    const result = await http.get(`/Department/${id}`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetDepartmentDetail;
