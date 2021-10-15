import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";

export default class UserStore {
  refreshTokenTimeout: any;
  rootStore: RootStore;
  user: IUser | null = null;
  loading = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  };

  get isLoggedIn() {
    return !!this.user;
  };

  login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login({email: 'test@outlook.com', password:'test'});
      console.log('login' + user);
      runInAction(() => {
        this.user = user;
      });
    //   this.rootStore.commonStore.setToken(user.token);
    //   this.startRefreshTokenTimer(user);
    //   this.rootStore.modalStore.closeModal();
    //   history.push("/arena");
    } catch (error) {
      throw error;
    }
  };

  register = async (values: IUserFormValues) => {
    try {
      await agent.User.register(values);
      // this.rootStore.modalStore.closeModal();
      // history.push(`/users/registerSuccess?email=${values.email}`);
    } catch (error) {
      throw error;
    }
  };
}
