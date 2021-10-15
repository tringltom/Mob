import { configure } from "mobx";
import { createContext } from "react";
import UserStore from "./userStore";

configure({ enforceActions: "always" });

export class RootStore {
  userStore: UserStore;


  constructor() {
    this.userStore = new UserStore(this);
  };
};

export const RootStoreContext = createContext(new RootStore());
