export const overlay = "div[data-testid='modal-overlay']";

describe("Колонка ингредиентов ", () => {
  beforeEach(() => {
    cy.visit("dashboard");
    cy.viewport(1920, 1080);
    cy.get("a[data-testid='link']")
      .contains("Краторная булка N-200i")
      .as("link");
  });
  it("Закрытие модального окна на крестик", () => {
    cy.get("@link").should("exist");
    cy.get("@link").click();
    cy.get(overlay).should("exist");
    cy.get("[class^=modal_modal__cross__]").should("exist");
    cy.get("[class^=modal_modal__cross__]").click();
    cy.get(overlay).should("not.exist");
  });
  it("Закрытие модального окна на overlay", () => {
    cy.get("@link").should("exist");
    cy.get("@link").click();

    cy.get(overlay).should("exist");
    cy.get(overlay).should("exist");
    cy.get(overlay).click({ force: true });
    cy.get(overlay).should("not.exist");
  });
  it("Закрытие модального окна с помощью клавиши 'Esc'", () => {
    cy.get("@link").should("exist");

    cy.get("@link").click();
    cy.get(overlay).should("exist");
    cy.get("body").type("{esc}");
    cy.get(overlay).should("not.exist");
  });
});
