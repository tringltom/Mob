import { makeAutoObservable, reaction } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStore } from "./rootStore";

export default class CommonStore {
  rootStore: RootStore;
  
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          AsyncStorage.setItem("jwt", token as string);
        } else {
          console.log(token);
          AsyncStorage.removeItem("jwt");
        }
      }
    );
  };

  token: string | null = null;
  
  setToken = (token: string | null) => {
    this.token = token;
  };
};
