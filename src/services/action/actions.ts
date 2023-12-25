import { TFeed } from "../../types/interface";

export const WS_CONNECTION_START_FEED: "WS_CONNECTION_START" =
  "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
/* export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE"; */

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START_FEED;
  payload: string;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  payload: string;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: string;
}
export interface IWsConnectionMessage {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TFeed;
}
export interface IWsConnectionSuccessClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  payload: string;
}

export const WsConnectionStart = (Url: string) => {
  return {
    type: WS_CONNECTION_START_FEED,
    payload: Url,
  };
};
export const WsConnectionSuccess = (message: string) => {
  return {
    type: WS_CONNECTION_SUCCESS,
    payload: message,
  };
};
export const WsConnectionError = (message: string) => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: message,
  };
};
export const WsConnectionMessage = (message: TFeed) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};
export const WsConnectionClossed = (message: string) => {
  return {
    type: WS_CONNECTION_CLOSED,
    payload: message,
  };
};

export const wsActions = {
  wsInit: WS_CONNECTION_START_FEED,
  wsSuccess: WS_CONNECTION_SUCCESS,
  wsClose: WS_CONNECTION_CLOSED,
  wsError: WS_CONNECTION_ERROR,
  wsMessage: WS_GET_MESSAGE,
};
export type IAction = IWsConnectionStart | IWsConnectionSuccessClosed;
export type TActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionMessage
  | IWsConnectionSuccessClosed;
