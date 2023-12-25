import { RootState } from "../store";

export const user = (state: RootState) => state.user?.data;
export const check = (state: RootState) => state.user.isAuthCheck;
export const passcodeForgot = (state: RootState) => state.user.passwordForgot;
export const profileName = (state: RootState) => state.user.data;
export const profileEmail = (state: RootState) => state.user.data;
