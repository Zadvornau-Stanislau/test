import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uuidv4 from "react-uuid";
import { IIngredientAndUniqueId } from "../../types/interface";

interface IListState {
  bun: null | IIngredientAndUniqueId;
  stuffing: IIngredientAndUniqueId[];
}

export const initialState: IListState = {
  bun: null,
  stuffing: [],
};

export const addIngredinentConstructor = createAsyncThunk(
  "constructor/addIngrrdinent",
  async (ingredient: IIngredientAndUniqueId) => {
    return ingredient;
  }
);

export const constructorSlice = createSlice({
  name: "constructorIngredient",
  initialState,
  reducers: {
    deleteStuffing: (state, action) => {
      state.stuffing = state.stuffing.filter(
        (item, index) => index !== action.payload
      );
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.stuffing = [];
    },
    reorderStuffing: (state, action) => {
      const { from, to } = action.payload;
      const [movedElement] = state.stuffing.splice(from, 1);
      state.stuffing.splice(to, 0, movedElement);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addIngredinentConstructor.fulfilled, (state, action) => {
      const ingredient = action.payload as IIngredientAndUniqueId;
      if (ingredient.type === "bun") {
        state.bun = { ...ingredient, uniqueId: uuidv4() };
      } else {
        state.stuffing.push({ ...ingredient, uniqueId: uuidv4() });
      }
    });
  },
});
export const { deleteStuffing, reorderStuffing, resetConstructor } =
  constructorSlice.actions;
export default constructorSlice.reducer;
