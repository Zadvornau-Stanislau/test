import {
  chekUserAuth,
  logoutUserRequest,
  dataСhangeRequest,
  userSlice,
  currentUserRequest,
  registerUserRequest,
  authUserRequest,
  resetPassword,
  forgotPassword,
} from "./user-slice";
import { initialState } from "./user-slice";

const StateForgot = {
  userLoaded: false,
  isPending: true,
  isAuthCheck: true,
  passwordReset: false,
  passwordForgot: false,
  success: true,
};

describe("Тестируем слайс пользователя", () => {
  test("chekUserAuth тест", () => {
    expect(userSlice.reducer(initialState, chekUserAuth())).toEqual({
      ...initialState,
      isAuthCheck: true,
    });
  });
  test("resetPassword тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: resetPassword.pending.type,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("currentUserRequest тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: currentUserRequest.pending.type,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("authUserRequest тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: authUserRequest.pending.type,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("registerUserRequest тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: registerUserRequest.pending.type,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("dataСhangeRequest тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: dataСhangeRequest.pending.type,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("logoutUserRequest тест", () => {
    expect(
      userSlice.reducer(
        {
          ...initialState,
          isPending: false,
          isAuthCheck: true,
          data: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
          success: true,
        },
        {
          type: logoutUserRequest.pending.type,
        }
      )
    ).toEqual({
      ...initialState,
      isPending: true,
      isAuthCheck: true,
      data: {
        email: "romankechko98@yandex.ru",
        name: "roman",
      },
      success: true,
    });
  });
  test("forgotPassword тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: "user/forgotPassword/pending",
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("currentUserRequest загрузка", () => {
    expect(
      userSlice.reducer(initialState, {
        type: currentUserRequest.fulfilled.type,
        payload: {
          user: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
        },
      })
    ).toEqual({
      ...initialState,
      data: {
        email: "romankechko98@yandex.ru",
        name: "roman",
      },
      success: true,
    });
  });
  test("authUserRequest загрузка", () => {
    expect(
      userSlice.reducer(initialState, {
        type: authUserRequest.fulfilled.type,
        payload: {
          user: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
        },
      })
    ).toEqual({
      ...initialState,
      data: {
        email: "romankechko98@yandex.ru",
        name: "roman",
      },
      success: true,
    });
  });
  test("registerUserRequest загрузка", () => {
    expect(
      userSlice.reducer(initialState, {
        type: registerUserRequest.fulfilled.type,
        payload: {
          user: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
        },
      })
    ).toEqual({
      ...initialState,
      data: {
        email: "romankechko98@yandex.ru",
        name: "roman",
      },
      success: true,
    });
  });
  test("dataСhangeRequest загрузка", () => {
    expect(
      userSlice.reducer(initialState, {
        type: dataСhangeRequest.fulfilled.type,
        payload: {
          user: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
        },
      })
    ).toEqual({
      ...initialState,
      data: {
        email: "romankechko98@yandex.ru",
        name: "roman",
      },
      success: true,
    });
  });

  test("logoutUserRequest загрузка", () => {
    expect(
      userSlice.reducer(
        {
          ...initialState,
          isPending: true,
          isAuthCheck: true,
          data: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
          success: true,
        },
        {
          type: logoutUserRequest.fulfilled.type,
        }
      )
    ).toEqual({
      ...initialState,
      isAuthCheck: true,
      success: true,
    });
  });
  test("forgotPassword загрузка", () => {
    expect(
      userSlice.reducer(StateForgot, {
        type: forgotPassword.fulfilled.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: false,
      isAuthCheck: true,
      passwordReset: false,
      passwordForgot: true,
      success: true,
    });
  });

  test("chekUserAuth ошибка загрузки", () => {
    expect(userSlice.reducer(initialState, chekUserAuth())).toEqual({
      ...initialState,
      isAuthCheck: true,
    });
  });
  test("resetPassword ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: resetPassword.pending.type,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("currentUserRequest ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: currentUserRequest.pending.type,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("authUserRequest ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: authUserRequest.pending.type,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("registerUserRequest ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: registerUserRequest.pending.type,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("dataСhangeRequest ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: dataСhangeRequest.pending.type,
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  test("logoutUserRequest ошибка загрузки", () => {
    expect(
      userSlice.reducer(
        {
          ...initialState,
          isPending: true,
          isAuthCheck: true,
          data: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
          success: true,
        },
        {
          type: logoutUserRequest.pending.type,
        }
      )
    ).toEqual({
      ...initialState,
      isPending: true,
      isAuthCheck: true,
      data: {
        email: "romankechko98@yandex.ru",
        name: "roman",
      },
      success: true,
    });
  });
  test("forgotPassword ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: "user/forgotPassword/pending",
      })
    ).toEqual({
      ...initialState,
      isPending: true,
    });
  });
});
