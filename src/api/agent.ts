import axios, { AxiosResponse } from "axios";
import { IUser, IUserFormValues } from "../models/user";
import { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IActivitiesEnvelope, IActivityFormValues } from "../models/activity";
import { IDiceResult } from "../models/diceResult";

axios.defaults.baseURL = process.env.NODE_ENV !== 'production'
? "http://192.168.0.16:4001"
: "https://ekviti.rs/api";

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("jwt")
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

axios.interceptors.response.use((response) => {
  return response}, 
  (error) => {
    if (error.message === "Network Error" && !error.response)
      setTimeout(() => {
        Toast.error("Mrežna Greška - Servis trenutno nije dostupan");
      }, 0);
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

const Activity = {
  create: async (activity: IActivityFormValues): Promise<string> => {
    let formData = new FormData();
    Object.keys(activity).forEach(async (key) => {
      if (key === "images") {
        if (activity[key] !== null)
          // @ts-ignore: Typescript/react-native-blob issue - working as expected witohut typescript     
          formData.append(key, { uri: activity[key], name: 'image.jpg', type: 'image/jpeg' });
      } else
      {
        formData.append(key, activity[key]);
      }
    });
    return await requests.postForm("/activities/create", formData) as Promise<string>;
  },
  getPendingActivities: (params: URLSearchParams): Promise<IActivitiesEnvelope> => axios.get("/activities",{params: params}).then(responseBody) as Promise<IActivitiesEnvelope>,
  resolvePendingActivity : (id: string, approve: boolean): Promise<boolean> => requests.post(`/activities/resolve/${id}`, {approve}) as Promise<boolean>
};

const Dice = {
  roll: () : Promise<IDiceResult> => requests.get("/dice/rollTheDice") as Promise<IDiceResult>
}

const sites = {
  User,
  Activity,
  Dice,
}

export default sites;
