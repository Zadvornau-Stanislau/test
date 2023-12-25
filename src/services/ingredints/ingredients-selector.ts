import { RootState } from "../store";

export const ingredientRequest = (state: RootState) =>
  state.ingredients.dataRequest as boolean;
export const successfulResponse = (state: RootState) =>
  state.ingredients.dataIngridients?.data || [];
export const ingredientRequestError = (state: RootState) =>
  state.ingredients.downloadError as boolean;
