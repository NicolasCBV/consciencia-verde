describe("Login E2E test", () => {
  context("sm screen", () => {
    beforeEach(() => {
      cy.viewport(320, 821);
    });
    
    it("should test login page", () => {
      cy.setCookie("refresh-cookie", "test")
      cy.visit("/login");

      cy.getCookie("refresh-cookie")
        .should("not.exist")

      cy.get("form input")
        .should("have.length", 3);

      cy.get("#switch-button")
        .click();

      cy.get("#switch-button")
        .click();

      cy.get("#forgot-password-button a")
        .click()
    })
  })
})
