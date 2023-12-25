describe("Модальное окно ", () => {
  beforeEach(() => {
    cy.visit("dashboard");
    cy.viewport(1920, 1080);
  });
  it("Колонка ингредиентов", () => {
    //Проверка наличия заголовков
    cy.get("[class^=burger-ingredients_title__]").should(
      "have.text",
      "Соберите бургер"
    );
    cy.get(
      "[class^=burger-ingredients_ingredient_category__] > :nth-child(1)"
    ).should("have.text", "Булки");

    cy.get(
      "[class^=burger-ingredients_ingredient_category__] > :nth-child(2)"
    ).should("have.text", "Начинки");
    cy.get(
      "[class^=burger-ingredients_ingredient_category__] > :nth-child(2)"
    ).click();

    cy.get(
      "[class^=burger-ingredients_ingredient_category__] > :nth-child(3)"
    ).should("have.text", "Соусы");
    cy.get(
      "[class^=burger-ingredients_ingredient_category__] > :nth-child(3)"
    ).click();
    cy.get(
      "[class^=burger-ingredients_ingredient_category__] > :nth-child(1) > .text"
    ).click();

    cy.get("#buns").should("have.text", "Булки");
    cy.get("#mains").should("have.text", "Начинка");
    cy.get("#sauces").should("have.text", "Соусы");
    //Проверка наличия заголовков
  });
  it("Загрузка данных с сервера", () => {
    cy.intercept("GET", "/api/ingredients", { fixture: "ingredients.json" });
    cy.get("img[data-testid='ingredients-image']").should("exist");
    cy.get(".ingredients-counter").should("exist");
    cy.get("p[data-testid='ingredients-price']").should("exist");
    cy.get("p[data-testid='ingredients-name']").should("exist");
  });
});
