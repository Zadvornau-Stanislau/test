import { IIngredient } from "../../types/interface";
import { RootState } from "../store";

export const buns = (state: RootState) =>
  state.constructorIngredient?.bun || [];
export const stuffing = (state: RootState) =>
  state.constructorIngredient?.stuffing || [];
export const bunId = (state: RootState) =>
  state.constructorIngredient.bun?._id || [];
export const stuffingId = (state: RootState) => {
  return state.constructorIngredient.stuffing
    ? state.constructorIngredient.stuffing.map((item) => item?._id)
    : [];
};
