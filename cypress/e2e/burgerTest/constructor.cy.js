import "cypress-wait-until";
const email = "[type=email]";
const password = "[type=password]";
describe("Колонка ингредиентов ", () => {
  beforeEach(() => {
    cy.visit("dashboard");
    cy.viewport(1920, 1080);
    cy.get("[class^=burger-constructor_bun__] > .constructor-element").as(
      "bun"
    );
    cy.get("p[data-testid='final-price']").as("finalPrice");
    cy.get("button").contains("Оформить заказ").as("button");
  });
  it("Наличие пространства для броска ингридиентов + кнопка", () => {
    //Наличие пространства для броска ингридиентов

    cy.get("@bun").should("exist");
    cy.get(
      "[class^=burger-constructor_single__fill__] > .constructor-element"
    ).should("not.exist");
    cy.get(":nth-child(3) > .constructor-element").should("exist");
    //Наличие пространства для броска ингридиентов

    //Конечная цена и кнопка оформления
    cy.get("@finalPrice").should("have.text", "0");
    cy.get("@button").should("exist");
    cy.get("@button").should("have.attr", "disabled");
    //Конечная цена и кнопка оформления
  });
  it("Перемещение ", () => {
    //переместил булку

    cy.get(
      ":nth-child(2) > :nth-child(1) > [class^=burger-ingredient_cart__ingridient_link__] > .counter"
    ).should("have.text", "0"); //количество добавленных булок

    cy.get(
      "[class^=burger-ingredients_container__] > :nth-child(2) > :nth-child(1)"
    ).trigger("dragstart");
    cy.get("@bun").trigger("drop");

    cy.get(
      ":nth-child(2) > :nth-child(1) > [class^=burger-ingredient_cart__ingridient_link__] > .counter"
    ).should("have.text", "2"); //новое количество добавленных булок

    cy.get("@finalPrice").should("have.text", "2510"); // новая цена
    cy.get("button")
      .contains("Оформить заказ")
      .should("not.have.attr", "disabled");
    //переместил булку

    //переместил начинку
    cy.get(
      ":nth-child(5) > [class^=burger-ingredient_cart__ingridient_link__] > .counter"
    ).should("have.text", "0"); //количество добавленной начинки

    cy.get(":nth-child(4) > :nth-child(5)").trigger("dragstart");
    cy.get("@bun").trigger("drop");

    cy.get(
      ":nth-child(5) > [class^=burger-ingredient_cart__ingridient_link__] > .counter"
    ).should("have.text", "1"); //новое количество добавленной начинки

    cy.get("@finalPrice").should("have.text", "2810"); // новая цена
    //переместил начинку

    //переместил соус
    cy.get(
      ":nth-child(6) > :nth-child(3) > [class^=burger-ingredient_cart__ingridient_link__] > .counter"
    ).should("have.text", "0"); //новое количество добавленных соусов
    cy.get(
      "[class^=burger-ingredients_container__] > :nth-child(6) > :nth-child(3)"
    ).trigger("dragstart");
    cy.get("@bun").trigger("drop");
    cy.get(
      "[class^=burger-ingredients_container__] > :nth-child(6) > :nth-child(3)"
    ).trigger("dragstart");
    cy.get("@bun").trigger("drop");
    cy.get(
      ":nth-child(6) > :nth-child(3) > [class^=burger-ingredient_cart__ingridient_link__] > .counter"
    ).should("have.text", "2"); //новое количество добавленных соусов
    cy.get("@finalPrice").should("have.text", "2840"); // новая цена
    //переместил соус

    //работа со строницей /login
    cy.get("button").contains("Оформить заказ").click();
    cy.url().should("include", "/login");
    cy.get(".text_type_main-medium").contains("Вход");
    cy.get(email).should("exist");
    cy.get(password).should("exist");

    cy.get(".button").contains("Войти").should("exist");
    cy.get(".pt-20 > [class^=login-page_link__]").should("exist");
    cy.get(".pt-4 > [class^=login-page_link__]").should("exist");
    /*   cy.get(".pt-20 > [class^=login-page_link__]").click(); */

    cy.get(email).type("romanka6@yandex.ru"); //
    cy.get(password).type("123456789"); //
    cy.get(".button").contains("Войти").click(); //
    cy.intercept("GET", "/api//auth/login", { fixture: "user.json" }); //
    //работа со строницей /login

    //работа со строницей /Register
    /*   cy.url().should("include", "/register");
    cy.get(".text_type_main-medium").should("exist");
    cy.get("[type=text]").should("exist");
    cy.get(email).should("exist");
    cy.get(password).should("exist");
      cy.get(".button").contains("Зарегистрироваться").should("exist");
    cy.get("[class^=register-page_link__]").should("exist");
    //работа со строницей /Register

    //Регистрация

    // В задании не было указано через что проходить автотест, но новый пользователь проходит через регистрацию
    cy.get("[type=text]").type("roma"); //Эти данные уже прошли автотест, соответственно регистрация не будет пройдена
    cy.get(email).type("romanka1@yandex.ru"); //Для проверки теста нужно изменить данные
    cy.get(password).type("123456789"); //И также в cypress/fixtures/user.json
    cy.get(".button").contains("Зарегистрироваться").click(); //После изменения данных автотест вернется на нлавную страницу
    cy.intercept("GET", "/api/auth/register", { fixture: "user.json" }); */
    //Регистрация

    //продолжаем оформлять заказ
    cy.get("button").contains("Оформить заказ").click();
    cy.get("[class^=burger-constructor_loader__]").should("exist");
    cy.intercept("/api/orders").as("orderRequest");
    cy.wait("@orderRequest", { timeout: 18000 });
    cy.get("[class^=modal_container__modal_center__]> :nth-child(1)").should(
      "exist"
    );
    cy.get("[ data-testid='order-number']").should("exist");
    cy.get("[class^=modal_modal__cross__]").click();
    cy.get("div[data-testid='modal-overlay']").should("not.exist");
    //продолжаем оформлять заказ

    //Проверяем, что ингредиенты удалены из конструктора
    //Наличие пространства для броска ингридиентов
    cy.get("@bun").should("exist");
    cy.get(
      "[class^=burger-constructor_single__fill__] > .constructor-element"
    ).should("not.exist");
    cy.get(":nth-child(3) > .constructor-element").should("exist");
    //Наличие пространства для броска ингридиентов

    //Конечная цена и кнопка оформления
    cy.get("@finalPrice").should("have.text", "0");
    cy.get("button").contains("Оформить заказ").should("exist");
    cy.get("button").contains("Оформить заказ").should("have.attr", "disabled");
    //Конечная цена и кнопка оформления
    //Проверяем, что ингредиенты удалены из конструктора
  });
});
