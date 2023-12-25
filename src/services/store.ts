import { combineReducers, configureStore } from "@reduxjs/toolkit";

import ingredientsSlice from "./ingredints/ingredients-slice";
import constructorSlice from "./constructor/constructor-slice";
import modalOrderSlice from "./modal-order/modal-order-slice";
import userSlice from "./user/user-slice";

import { wsActions } from "./action/actions";
import { socketMiddleware } from "./middleware/socket-middleware";
import { wsReducer } from "./reducer/reducer";

const liveTableMiddleware = socketMiddleware(wsActions);

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    constructorIngredient: constructorSlice,
    modalOrder: modalOrderSlice,
    user: userSlice,
    ws: wsReducer.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveTableMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
