import { RootState } from "../store";

export const nubers = (state: RootState) =>
  state.modalOrder.status?.order.number || null;
export const download = (state: RootState) => state.modalOrder?.loading;
export const authorizationUser = (state: RootState) =>
  state.modalOrder.authorizationPage;
