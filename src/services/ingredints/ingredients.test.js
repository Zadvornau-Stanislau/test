import { getIngredients, ingredientsSlice } from "./ingredients-slice";
import { initialState } from "./ingredients-slice";

const ingredientsArray = [
  {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa0942",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    __v: 0,
  },
];

describe("Тестируем слайс ингредиентов", () => {
  test("Процесс загрузки", () => {
    expect(
      ingredientsSlice.reducer(initialState, {
        type: "ingredients/getIngredients/pending",
      })
    ).toEqual({
      dataIngridients: null,
      dataRequest: true,
      downloadError: false,
    });
    expect(
      ingredientsSlice.reducer(undefined, {
        type: getIngredients.pending.type,
      })
    ).toEqual({
      dataIngridients: null,
      dataRequest: true,
      downloadError: false,
    });
  });
  test("Данные загружены", () => {
    expect(
      ingredientsSlice.reducer(initialState, {
        type: getIngredients.fulfilled.type,
        payload: ingredientsArray,
      })
    ).toEqual({
      dataIngridients: ingredientsArray,
      dataRequest: false,
      downloadError: false,
    });
  });
  test("Ошибка загрузки", () => {
    expect(
      ingredientsSlice.reducer(initialState, {
        type: getIngredients.rejected.type,
      })
    ).toEqual({
      dataIngridients: null,
      dataRequest: false,
      downloadError: true,
    });
  });
});
