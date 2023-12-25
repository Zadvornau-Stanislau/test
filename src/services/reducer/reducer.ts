import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFeed } from "../../types/interface";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  IWsConnectionMessage,
  IWsConnectionError,
} from "../action/actions";

type TWSState = {
  wsConnected: boolean;
  messages: TFeed | null;
  error?: Event | string;
};

export const initialState: TWSState = {
  wsConnected: false,
  messages: null,
};

// Создадим срез (slice) для WebSocket
export const wsReducer = createSlice({
  name: "ws",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(WS_CONNECTION_SUCCESS, (state) => {
        state.error = undefined;
        state.wsConnected = true;
      })
      .addCase(WS_CONNECTION_ERROR, (state, action: IWsConnectionError) => {
        state.error = action.payload;
        state.wsConnected = false;
      })
      .addCase(WS_CONNECTION_CLOSED, (state) => {
        state.error = undefined;
        state.wsConnected = false;
      })
      .addCase(WS_GET_MESSAGE, (state, action: IWsConnectionMessage) => {
        if (action.payload) {
          state.error = undefined;
          state.messages = action.payload;
        }
      });
  },
});

export const {} = wsReducer.actions;

export default wsReducer.reducer;
