import {
  closeModal,
  modalOrderSlice,
  openTheAuthorizationWindow,
  setData,
} from "./modal-order-slice";
import { initialState } from "./modal-order-slice";

const orderData = {
  name: "Флюоресцентный бургер",
  success: true,
  order: {
    createdAt: "2023-12-06T05:58:21.678Z",
    ingredients: [
      {
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        name: "Флюоресцентная булка R2-D3",
        price: 988,
        proteins: 44,
        type: "bun",
        __v: 0,
        _id: "643d69a5c3f7b9001cfa093d",
      },
      {
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        name: "Флюоресцентная булка R2-D3",
        price: 988,
        proteins: 44,
        type: "bun",
        __v: 0,
        _id: "643d69a5c3f7b9001cfa093d",
      },
    ],
    name: "Флюоресцентный бургер",
    number: 28374,
  },
};

describe("Тестируем отправку заказа", () => {
  test("closeModal модалка", () => {
    expect(
      modalOrderSlice.reducer(
        {
          ...initialState,
          status: orderData,
        },
        closeModal()
      )
    ).toEqual(initialState);
  });
  test("openTheAuthorizationWindow модалка", () => {
    expect(
      modalOrderSlice.reducer(initialState, openTheAuthorizationWindow())
    ).toEqual({
      status: null,
      loading: false,
      authorizationPage: true,
    });
  });
  test("Данные загружаются", () => {
    expect(
      modalOrderSlice.reducer(initialState, {
        type: setData.pending.type,
      })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  test("Данные загруpузились", () => {
    expect(
      modalOrderSlice.reducer(initialState, {
        type: setData.fulfilled.type,
        payload: orderData,
      })
    ).toEqual({
      ...initialState,
      status: orderData,
    });
  });
  test("Ошибка загрузки", () => {
    expect(
      modalOrderSlice.reducer(initialState, {
        type: setData.rejected.type,
      })
    ).toEqual({
      status: null,
      loading: false,
      authorizationPage: false,
    });
  });
});
