import {
  addIngredinentConstructor,
  constructorSlice,
  deleteStuffing,
  reorderStuffing,
  resetConstructor,
} from "./constructor-slice";

import { initialState } from "./constructor-slice";

const bunObject = {
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
};

const stuffingArray = [
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
];
const stuffingIgredientsArray = [
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
const stuffingIgredientsArrayСonversely = [
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
];

jest.mock("react-uuid", () => () => "123");

describe("Тестируем слайс конструктор", () => {
  test("deleteStuffing тест", () => {
    expect(
      constructorSlice.reducer(
        {
          ...initialState,
          bun: bunObject,
          stuffing: stuffingArray,
        },
        deleteStuffing(0)
      )
    ).toEqual({
      ...initialState,
      bun: bunObject,
    });
    expect(constructorSlice.reducer(undefined, deleteStuffing(0))).toEqual(
      initialState
    );
  });
  test("resetConstructor тест", () => {
    expect(
      constructorSlice.reducer(
        {
          ...initialState,
          bun: bunObject,
          stuffing: stuffingArray,
        },
        resetConstructor()
      )
    ).toEqual(initialState);
    expect(constructorSlice.reducer(undefined, resetConstructor())).toEqual(
      initialState
    );
  });
  test("reorderStuffing тест", () => {
    expect(
      constructorSlice.reducer(
        {
          ...initialState,
          stuffing: stuffingIgredientsArray,
        },
        reorderStuffing({ from: 0, to: 1 })
      )
    ).toEqual({
      ...initialState,
      stuffing: stuffingIgredientsArrayСonversely,
    });
    expect(
      constructorSlice.reducer(undefined, reorderStuffing({ from: 0, to: 1 }))
    ).toEqual({
      ...initialState,
      stuffing: [undefined],
    });
  });

  test("addIngredinentConstructor.fulfilled тест", () => {
    const initialState = {
      bun: null,
      stuffing: [],
    };

    const resultState = constructorSlice.reducer(
      initialState,
      addIngredinentConstructor.fulfilled(bunObject)
    );

    const expectedBun = {
      ...bunObject,
      uniqueId: "123",
    };

    expect(resultState).toEqual({
      ...initialState,
      bun: expectedBun,
    });

    const resultStateWithMain = constructorSlice.reducer(
      initialState,
      addIngredinentConstructor.fulfilled(stuffingIgredientsArray)
    );

    const expectedStuffing = [
      {
        ...stuffingIgredientsArray,
        uniqueId: "123", // значение uuidv4 может быть любым
      },
    ];

    expect(resultStateWithMain).toEqual({
      ...initialState,
      stuffing: expectedStuffing,
    });
  });
});
