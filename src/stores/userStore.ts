import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";

export default class UserStore {
  rootStore: RootStore;
  user: IUser | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  };

  login = async (values: IUserFormValues) => {
    try {
      this.rootStore.freezeScreen();
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.unFreezeScreen();
      this.rootStore.modalStore.closeModal();
    } catch (error) {
      this.rootStore.unFreezeScreen();
      throw error;
    }
  };

  logout = () => {
      this.rootStore.commonStore.setToken(null);
      this.user = null;
   };

  register = async (values: IUserFormValues) => {
    try {
      //await agent.User.register(values);
      // this.rootStore.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
}
