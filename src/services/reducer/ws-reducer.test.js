import {
  WsConnectionClossed,
  WsConnectionError,
  WsConnectionMessage,
  WsConnectionStart,
  WsConnectionSuccess,
} from "../action/actions";
import { wsReducer } from "./reducer";
import { initialState } from "./reducer";

const data = [
  {
    _id: "6570413d7fd657001ba0740d",
    ingredients: ["643d69a5c3f7b9001cfa093d"],
    status: "done",
    name: "Флюоресцентный бургер",
    createdAt: "2023-12-06T09:39:09.950Z",
    updatedAt: "2023-12-06T09:39:10.228Z",
    number: 28381,
  },
  {
    _id: "65700b727fd657001ba073c0",
    ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"],
    status: "done",
    name: "Краторный бургер",
    createdAt: "2023-12-06T05:49:38.454Z",
    updatedAt: "2023-12-06T05:49:38.695Z",
    number: 28381,
  },
];

describe("Тестируем WebSocket", () => {
  test("WS_CONNECTION_START", () => {
    expect(wsReducer.reducer(initialState, WsConnectionStart())).toEqual(
      initialState
    );
  });
  test("WS_CONNECTION_SUCCESS", () => {
    expect(wsReducer.reducer(initialState, WsConnectionSuccess())).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });
  test("WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer.reducer(initialState, WsConnectionError("Ошибка"))
    ).toEqual({
      ...initialState,
      error: "Ошибка",
    });
  });
  test("WS_CONNECTION_CLOSED", () => {
    expect(wsReducer.reducer(initialState, WsConnectionClossed())).toEqual({
      wsConnected: false,
      messages: null,
    });
  });
  test("WS_GET_MESSAGE", () => {
    expect(wsReducer.reducer(initialState, WsConnectionMessage(data))).toEqual({
      ...initialState,
      messages: data,
    });
  });
});
