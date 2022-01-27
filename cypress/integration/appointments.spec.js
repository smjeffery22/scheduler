describe("Appointments", () => {
  beforeEach(function () {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Jeffery Park");

    cy.get("[alt='Sylvia Palmer']")
      .first()
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Jeffery Park");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.get("[alt='Tori Malcolm']")
      .click();

    cy.get("input")
      .clear()
      .type("Park, Jeffery")

    cy.contains("Save")
      .click();
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click(({ force: true }));

    cy.get("button")
      .contains("Confirm")
      .click()

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
