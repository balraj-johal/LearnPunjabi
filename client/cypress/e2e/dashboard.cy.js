/// <reference types="cypress" />

describe('dashboard', () => {
    before(() => {
        // open site
        cy.visit('/');
        // login user
        cy.contains('Start Learning').click();
        cy.get('#username').type("@CDawgVA2");
        cy.get('#password').type("@CDawgVA2");
        cy.get('.login-form button').click();
        // accept cookies
        cy.get('#rcc-confirm-button').click();
    })

    it('begins a lesson', () => {
        cy.get('.lesson-icon').first().click();
        cy.get('#next-task-btn').should("be.visible");
    })
})
