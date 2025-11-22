import axios from "axios";
import {getItem,removeItem,setItem,} from "../../utils/helper/storage.services";
import { toast } from "react-toastify";

const baseURL = "https://sepehracademy.liara.run";

const instance = new axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  return response.data;
};

const onError = (err) => {
  if (err.response.status === 401 || err.response.status === 403) {
    toast.error("لطفا ابتداوارد شوید");
    setItem("isLogin", false);
    removeItem("token");
  }

  if (err.response.status >= 400 && err.response.status < 500) {
    console.log("Client error: " + err.response.status);
  }

  return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess, onError);
instance.interceptors.request.use((opt) => {
  const token = getItem("token");
  console.log("token:", token);
  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export default instance;
