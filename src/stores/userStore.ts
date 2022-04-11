import { IUser, IUserFormValues } from "../models/user";
import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from "./rootStore";
import agent from "../api/agent";
import { navigate } from "../navigationRef";

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
      this.rootStore.unfreezeScreen();
      this.rootStore.modalStore.closeModal();
    } catch (error) {
      this.rootStore.unfreezeScreen();
      console.log(error)
      throw error;
    }
  };

  logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
  };

  getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
        this.rootStore.showDice = user.isDiceRollAllowed;
      });
      this.rootStore.commonStore.setToken(user.token);
    } catch (error) {
      console.log(error);
    }
  };

  register = async (values: IUserFormValues) => {
    try {
      this.rootStore.freezeScreen();
      await agent.User.register(values);
      runInAction(() => {
        this.rootStore.unfreezeScreen();
        this.rootStore.modalStore.closeModal();
        navigate("RegisterSuccess", values.email);
      });
    } catch (error) {
      this.rootStore.unfreezeScreen();
      throw error;
    }
  };
}
