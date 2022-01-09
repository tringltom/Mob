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
      this.rootStore.unfreezeScreen();
      this.rootStore.modalStore.closeModal();
    } catch (error) {
      this.rootStore.unfreezeScreen();
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
      //await agent.User.register(values);
      // this.rootStore.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
}
