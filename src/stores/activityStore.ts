import { makeAutoObservable, reaction, runInAction } from "mobx";

import { IActivityFormValues } from "../models/activity";
import { RootStore } from "./rootStore";
import agent from "../api/agent";
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
      this.rootStore.freezeScreen();
      await agent.PendingActivity.create(values);
      runInAction(() => {
        this.rootStore.modalStore.closeModal();
        this.rootStore.unfreezeScreen();
        navigate("Arena");
        setTimeout(() => {
          globalThis.toast.show("Uspešno kreiranje, molimo Vas da sačekate odobrenje", {type: "success"});
        }, 0);
      });
    } catch (error) {
      this.rootStore.modalStore.closeModal();
      this.rootStore.unfreezeScreen();
      navigate("Arena");
      setTimeout(() => {
        globalThis.toast.show("Došlo je do greške, molimo Vas pokušajte ponovo..", {type: "danger"});
      }, 0);
    }
  };

  loadPendingActivities = async () => {
    this.loadingInitial = true;
    try {
      const activitiesEnvelope = await agent.PendingActivity.getPendingActivities(
        this.axiosParams
      );
      const { activities, activityCount } = activitiesEnvelope;
      runInAction(() => {
        activities.forEach((activity: { id: any; }) => {
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
      this.rootStore.freezeScreen();

      if (approve) await agent.Activity.approvePendingActivity(activityId);
      else await agent.PendingActivity.dissaprove(activityId);
      runInAction(() => {
        this.activityRegistry.delete(activityId);
        this.rootStore.modalStore.closeModal();
        this.rootStore.unfreezeScreen();
      });
    } catch (error) {
      this.rootStore.unfreezeScreen();
      this.rootStore.modalStore.closeModal();
      setTimeout(() => {
        globalThis.toast.show("Neuspešno, proverite konzolu", {type: "danger"});
      }, 0);
    }
  };
}
