describe('Home E2E test', () => {
  context("sm screen", () => {
    beforeEach(() => {
      cy.viewport(320, 821);
    });

    it('should test home page', () => {
      cy.visit("/")

      cy.get("#home")
        .should("be.visible")
        .get("#background img")
        .should("be.visible")
        .get("#about")
        .should("be.visible")
        .get("#contacts")
        .should("be.visible")

      cy.get("#mainPhrase")
        .get(".bigTitle")
        .contains(/Cuidar da Terra é cultivar o Amanhã!/i);

      cy.get("#mainPhrase-button-news a")
        .click()
      

      cy.visit("/");

      cy.get("#mainPhrase-button-nav a")
        .click({ force: true }) 

      cy.get("#about-text")
        .contains(/Sobre nos/i);

      cy.get("#about-button-news a")
        .click();

      cy.visit("/");

      cy.get("#contacts h1")
        .contains(/Contatos/i)

      cy.get("#contacts li")
        .should("have.length", 6)
        .each(($li) => {
          cy.wrap($li)
            .find("a")
            .click();
        })
    });
  })
})
