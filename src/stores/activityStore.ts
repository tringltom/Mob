import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { IActivityFormValues } from "../models/activity";
import { RootStore } from "./rootStore";
import { Toast } from "toastify-react-native";
import { navigate } from "../navigationRef";

const LIMIT = 5;

export default class ActivityStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.activityRegistry.clear();
        this.loadPendingActivities();
      }
    );
  }

  submitting = false;
  activityRegistry = new Map();
  page = 0;
  predicate = new Map();
  loadingInitial = false;
  activityCount = 0;

  get activitiesArray() {
    return Array.from(this.activityRegistry.values());
  }

  setPage = (page: number) => {
    this.page = page;
  };

  get totalPages() {
    return Math.ceil(this.activityCount / LIMIT);
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("limit", String(LIMIT));
    params.append("offset", `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, value.toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  create = async (values: IActivityFormValues) => {
    try {
      this.rootStore.frezeScreen();
      const message = await agent.Activity.create(values);
      runInAction(() => {
        this.rootStore.modalStore.closeModal();
        this.rootStore.unFrezeScreen();
        navigate("Arena");
        setTimeout(() => {
          Toast.success(message);
        }, 0);
      });
    } catch (error) {
      this.rootStore.modalStore.closeModal();
      this.rootStore.unFrezeScreen();
      navigate("Arena");
      setTimeout(() => {
        Toast.error("Došlo je do greške, molimo Vas pokušajte ponovo..");
      }, 0);
    }
  };

  loadPendingActivities = async () => {
    this.loadingInitial = true;
    try {
      const activitiesEnvelope = await agent.Activity.getPendingActivities(
        this.axiosParams
      );
      const { activities, activityCount } = activitiesEnvelope;
      runInAction(() => {
        activities.forEach((activity) => {
          this.activityRegistry.set(activity.id, activity);
        });
        this.activityCount = activityCount;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.loadingInitial = false;
      });
    }
  };

  approvePendingActivity = async (activityId: string, approve: boolean) => {
    try {
      this.rootStore.frezeScreen();
      const success = await agent.Activity.resolvePendingActivity(
        activityId,
        approve
      );
      runInAction(() => {
        if (success) {
          setTimeout(() => {
            Toast.success("Uspešno ste odobrili/odbili aktivnost");
          }, 0);
          this.activityRegistry.delete(activityId);
        } else {
          setTimeout(() => {
            Toast.error("Neuspešno ste odobrili/odbili aktivnost");
          }, 0);
        }
        this.rootStore.modalStore.closeModal();
        this.rootStore.unFrezeScreen();
      });
    } catch (error) {
      this.rootStore.unFrezeScreen();
      this.rootStore.modalStore.closeModal();
      setTimeout(() => {
        Toast.error("Neuspešno, proverite konzolu");
      }, 0);
    }
  };
}
