import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import checkResponse, { url } from "../../utils/chek-response";
import { IdataIngredient } from "../../types/interface";

interface IListState {
  dataIngridients: IdataIngredient | null;
  dataRequest: boolean;
  downloadError: boolean;
}

export const initialState: IListState = {
  dataIngridients: null,
  dataRequest: false,
  downloadError: false,
};

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (_, { fulfillWithValue }) => {
    const res = await fetch(`${url}/ingredients
    `);
    const responseData = (await checkResponse(res)) as IdataIngredient;
    return fulfillWithValue(responseData);
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.dataRequest = true;
      state.downloadError = false;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.dataIngridients = action.payload;
      state.dataRequest = false;
      state.downloadError = false;
    });

    builder.addCase(getIngredients.rejected, (state) => {
      state.downloadError = true;
      state.dataRequest = false;
    });
  },
});

export default ingredientsSlice.reducer;
