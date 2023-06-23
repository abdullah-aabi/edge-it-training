// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
Cypress.Commands.add('loginWithUI', (username, password) => {
    // Login method
    cy.visit("/") // tkes baseUrl from cypress.config.js by default
    cy.get("div.login_logo").should("have.text", "Swag Labs") // assertion of text

    cy.get("input#user-name").type(username)
    cy.get("input#password").type(password)
    cy.get("input#login-button").click()
    // Verify, the user is logged in or not.
    cy.get("span.title").should("have.text", "Products")
})