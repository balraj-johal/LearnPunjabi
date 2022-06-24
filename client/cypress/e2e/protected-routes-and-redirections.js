/// <reference types="cypress" />
/**
 * does stop allowing edit access if not admin
 */
describe('test if routes and redirections work as intended', () => {
    before(() => {
        // open site
        cy.visit('http://localhost:3000');
        // login user as admin
        cy.contains('Start Learning').click();
        cy.get('#username').type("@CDawgVA2");
        cy.get('#password').type("@CDawgVA2");
        cy.get('.login-form button').click();
    })

    it('redirects to dashboard if user is on site root', () => {
        cy.visit('http://localhost:3000');
        cy.get('.lesson-wrap').should('be.visible');
    })
    it('shows cookie confirmation prompt', () => {
        // accept cookies 
        cy.get('#rcc-confirm-button').should('be.visible');
        cy.get('#rcc-confirm-button').click();
    })
})
