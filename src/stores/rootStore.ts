import { configure, makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import { Toast } from "toastify-react-native";
import { Animated, Easing } from "react-native";

configure({ enforceActions: "always" });

export class RootStore {
  userStore: UserStore;
  modalStore: ModalStore;
  commonStore: CommonStore;
  activityStore: ActivityStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.modalStore = new ModalStore(this);
    this.commonStore = new CommonStore(this);
    this.activityStore = new ActivityStore(this);
    makeAutoObservable(this);
  }

  allowEvents = true;
  showDice = true;
  rotateAnimation = new Animated.Value(0);

  freezeScreen = () => {
    this.allowEvents = false;
  };

  unfreezeScreen = () => {
    this.allowEvents = true;
  };

  getPrice = async () => {
    Animated.loop(
      Animated.timing(this.rotateAnimation, {
        toValue: 1,
        duration: 2200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    setTimeout(async () => {
      try {
        this.freezeScreen();
        const diceResult = await agent.Dice.roll();
        runInAction(() => {
          this.rotateAnimation.stopAnimation();
          this.showDice = false;
          this.unfreezeScreen();
          setTimeout(() => {
            Toast.info(`${diceResult.result}: ${diceResult.message}`);
          }, 0);
        });
      } catch (error) {
        runInAction(() => {
          this.rotateAnimation.stopAnimation();
          this.showDice = false;
          this.unfreezeScreen();
        });
      }
    }, 2000);
  };
};

export const RootStoreContext = createContext(new RootStore());
