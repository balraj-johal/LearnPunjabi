/// <reference types="cypress" />

describe('dashboard', () => {
    beforeEach(() => {
        // open site
        cy.visit('http://localhost:3000');
        // login user
        cy.contains('Start Learning').click();
        cy.get('#username').type("@CDawgVA2");
        cy.get('#password').type("@CDawgVA2");
        cy.get('.login-form button').click();
        // accept cookies
        cy.get('#rcc-confirm-button').click();
    })

    it('begins a lesson', () => {
        cy.get('#icon-main').first().click();
        cy.get('#next-task-btn').should("be.visible");
    })
})
