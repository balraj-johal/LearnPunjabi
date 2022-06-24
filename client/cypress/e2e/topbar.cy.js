/// <reference types="cypress" />

describe('test topbar state when navigating through pages', () => {
    before(() => {
        // open site
        cy.visit('http://localhost:3000');
        // login user as admin
        cy.contains('Start Learning').click();
        cy.get('#username').type("@CDawgVA2");
        cy.get('#password').type("@CDawgVA2");
        cy.get('.login-form button').click();
        // accept cookies
        cy.get('#rcc-confirm-button').click();
    })

    it('allows admin account to access edit lessons', () => {
        cy.get('.account-button').first().click();
        cy.get('.edit-wrap').should("be.visible");
    })

    it('renders correct logo on desktop', () => {
        cy.get('#logo-full').should("be.visible");
    })
    it('renders correct logo on mobile', () => {
        cy.viewport(550, 750);
        cy.get('#logo-icon').should("be.visible");
    })
    it('shows leaderboard on dashboard', () => {
        cy.get('#logo-full').click();
        cy.get('#leaderboard').should("be.visible");
    })
    it('does not show leaderboard on other internal pages', () => {
        cy.get('.account-button').last().click();
        cy.get('#leaderboard').should("not.exist");
    })
})
