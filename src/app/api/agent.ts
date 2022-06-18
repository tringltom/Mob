import * as Linking from 'expo-linking';

import { IActivity, IActivityFormValues, IPendingActivitiesEnvelope, IPendingActivity } from "../models/activity";
import { IUser, IUserFormValues } from "../models/user";
import axios, { AxiosResponse } from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { IDiceResult } from "../models/diceResult";

axios.defaults.baseURL = process.env.NODE_ENV !== 'production'
? "http://192.168.0.15:4001"
: "https://ekvitiapi.azurewebsites.net";

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
        globalThis.toast.show("Mrežna Greška - Servis trenutno nije dostupan", {type: "danger"});
      }, 0);
    throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const prefix = Linking.makeUrl('/');

const requests = {
  head: (url: string) => axios.head(url).then(responseBody),
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  patch: (url: string, body: {}) => axios.patch(url, body, {headers: {'Content-type': 'application/json'}}).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, formData : any) => {
    return axios.post(url, formData, {
        headers: {'Content-type': 'multipart/form-data'},
    }).then(responseBody)
  },
  putForm: (url: string, formData : any) => {
    return axios
      .put(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  }
};

const Session = {
  sendEmailVerification: (email: string): Promise<string> => requests.head(`/session/email?email=${email}`),
  sendRecoverPassword: (email: string): Promise<string> => requests.head(`/session/password?email=${email}`),
  login: (user: IUserFormValues): Promise<IUser> => requests.put("/session", user),
  current: (): Promise<IUser> => requests.get("/session/me"),
  refreshToken: (): Promise<IUser> => requests.put("/session/refresh", {}),
  verifyEmail: (token: string, email: string): Promise<string> => requests.patch("/session/email", { token, email }),
  verifyPasswordRecovery: (token: string, email: string, newPassword: string): Promise<string> => 
    requests.patch("/session/password", {email, token, newPassword}),
  logout: (): Promise<void> => requests.delete("/session"),
  register: (user: IUserFormValues): Promise<IUser> => requests.post("/session", user),
  fbLogin: (accessToken: string) => requests.post("/session/facebook", { accessToken }),
};

const User = {
  // current: (): Promise<IUser> => requests.get("/users") as Promise<IUser>,
  // login: (user: IUserFormValues): Promise<IUser> =>
  //   requests.post("/users/login", user) as Promise<IUser>,
  // register: (user: IUserFormValues): Promise<IUser> =>
  //   requests.post(`/users/register?prefix=${prefix}`, user) as Promise<IUser>,
  // resendVerifyEmailConfirm: (email: any): Promise<void> =>
  //   requests.get(`/users/resendEmailVerification?email=${email}&prefix=${prefix}`) as Promise<void>,
  // verifyEmail: (token: string, email: string): Promise<void> =>
  //   requests.post("/users/verifyEmail", { token, email }) as Promise<void>,
};

const Activity = {
  // create: async (activity: IActivityFormValues): Promise<string> => {
  //   let formData = new FormData();
  //   Object.keys(activity).forEach(async (key) => {
  //     if (key === "images") {
  //       if (activity[key] !== null)
  //         // @ts-ignore: Typescript/react-native-blob issue - working as expected witohut typescript     
  //         formData.append(key, { uri: activity[key], name: 'image.jpg', type: 'image/jpeg' });
  //     } else
  //     {
  //       formData.append(key, activity[key]);
  //     }
  //   });
  //   return await requests.postForm("/activities/create", formData) as Promise<string>;
  // },
  // getPendingActivities: (params: URLSearchParams): Promise<IActivitiesEnvelope> => axios.get("/activities",{params: params}).then(responseBody) as Promise<IActivitiesEnvelope>,
  // resolvePendingActivity : (id: string, approve: boolean): Promise<boolean> => requests.post(`/activities/resolve/${id}`, {approve}) as Promise<boolean>
  approvePendingActivity : (id: string) : Promise<IActivity> =>
    requests.post(`/activities/pending-activity/${id}`, {})
};

const PendingActivity = {
  getPendingActivities: (params: URLSearchParams): Promise<IPendingActivitiesEnvelope> => 
    axios.get("/pending-activities",{params: params}).then(responseBody),
  getOwnerPendingActivities: (params: URLSearchParams): Promise<IPendingActivitiesEnvelope> => 
    axios.get("/pending-activities/me",{params: params}).then(responseBody),
  getOwnerPendingActivity: (id: string): Promise<IActivityFormValues> =>
    requests.get(`/pending-activities/me/${id}`),
  dissaprove: (id: string): Promise<void> => requests.delete(`/pending-activities/${id}`),
  create: async (activity: IActivityFormValues): Promise<IPendingActivity> => {
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
    return await requests.postForm("/pending-activities", formData) as Promise<IPendingActivity>;
  }
};

const Dice = {
  roll: () : Promise<IDiceResult> => requests.get("/dice/roll") as Promise<IDiceResult>
}

const sites = {
  Session,
  User,
  Activity,
  PendingActivity,
  Dice,
}

export default sites;
