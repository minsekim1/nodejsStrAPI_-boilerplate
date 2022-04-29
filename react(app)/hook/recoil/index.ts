import { atom } from "recoil";
import localStorageEffect from "./localStorageEffect";

export const tokenState = atom<string | null>({
  key: "recoil/token",
  default: null,
  effects_UNSTABLE: [localStorageEffect("recoil/cache/token")],
});
