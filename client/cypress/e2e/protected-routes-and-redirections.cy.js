/// <reference types="cypress" />
/**
 * does stop allowing edit access if not admin
 */

describe('test if routes and redirections work as intended - logged in - admin', () => {
    beforeEach(() => {
        // open site
        cy.visit('/');
        // login user as admin
        cy.contains('Start Learning').click();
        cy.get('#username').type("@CDawgVA2");
        cy.get('#password').type("@CDawgVA2");
        cy.get('.login-form button').click();
        cy.wait(2000);
    })

    it('shows cookie confirmation prompt', () => {
        // accept cookies 
        cy.get('#rcc-confirm-button').should('be.visible');
        cy.get('#rcc-confirm-button').click();
    })
    it('shows 404 page', () => {
        cy.visit('/trains');
        cy.get('#404-page').should('exist');
    })
    it('redirects to dashboard if user is on site root', () => {
        cy.visit('/');
        cy.get('.lessons-wrap').should('be.visible');
    })
})

describe('test if routes and redirections work as intended - logged in', () => {
    beforeEach(() => {
        // get mock lesson data
        cy.fixture('user').then((user) => {
            // setup get request intercept
            cy.intercept(
                'GET', 
                '**/api/v1/users/', 
                user
            ).as('getUserData');
            cy.intercept(
                'POST',
                '**/api/v1/users/login',
                { message: `login for user successful!` }
            ).as('getLogin');
            cy.intercept(
                'POST', 
                '**/api/v1/users/refreshToken', 
                { userID: "user._id" }
            ).as('useRefreshToken');
        })
        // open site
        cy.visit('/');
    })

    it('shows cookie confirmation prompt', () => {
        // accept cookies 
        cy.get('#rcc-confirm-button').should('be.visible');
        cy.get('#rcc-confirm-button').click();
    })
    it('redirects to dashboard if user is on site root', () => {
        cy.visit('/');
        cy.get('.lessons-wrap').should('be.visible');
    })
    it('shows 404 page', () => {
        cy.visit('/trains');
        cy.get('#404-page').should('exist');
    })
    it('shows unauthorised when trying to access edit routes', () => {
        cy.visit('/edit');
        cy.get('#unauthorised').should('exist');
    })
})

describe('test if routes and redirections work as intended - not logged in', () => {
    before(() => {
        // open site
        cy.visit('/');
    })

    it('redirects to welcome if user is on anything but account', () => {
        cy.visit('/');
        cy.get('#welcome').should('be.visible');
        cy.visit('/lesson/lesson-1');
        cy.get('#welcome').should('be.visible');
    })

    it('does not redirect to welcome on account routes', () => {
        cy.visit('/account');
        cy.get('#welcome').should('not.exist');
    })
})
