import axios, { AxiosResponse } from "axios";
import { IUser, IUserFormValues } from "../models/user";
import { Toast } from "toastify-react-native";

axios.defaults.baseURL = process.env.NODE_ENV !== 'production'
? "http://192.168.0.15:4001"
: "https://ekviti.rs/api";

// axios.interceptors.request.use((config) => {
//   config.withCredentials = true;
//   const token = window.localStorage.getItem('jwt');
//   if (token) config!.headers!.Authorization = `Bearer ${token}`;
//      return config
//  }, error => {
//      return Promise.reject(error);
//  })

axios.interceptors.response.use(undefined, (error) => {
  console.log(error.response);
  if (error.message === "Network Error" && !error.response)
    Toast.error("Mrežna Greška - Servis trenutno nije dostupan");

  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, formData : any) => {
    return axios.post(url, formData, {
        headers: {'Content-type': 'multipart/form-data'},
    }).then(responseBody)
}
};

const User = {
  current: (): Promise<IUser> => requests.get("/users") as Promise<IUser>,
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post("/users/login", user) as Promise<IUser>,
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post("/users/register", user) as Promise<IUser>,
};

const sites = {
  User
}

export default sites;
