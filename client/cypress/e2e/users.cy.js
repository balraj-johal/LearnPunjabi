/// <reference types="cypress" />

describe('welcome page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('loads all sections', () => {
        cy.get('.welcome-div').should('have.length', 4)
    })

    it('opens account manager on click', () => {
        cy.contains('Start Learning').click();
        cy.get('.accounts-wrap').should('be.visible');
    })

    context('with account manager open', () => {
        beforeEach(() => {
            cy.contains('Start Learning').click();
        })

        it('defaults account manager to login', () => {
            cy.get('.login-form').should('be.visible');
        })
        it('shows errors when trying to login with empty fields', () => {
            cy.get('.login-form button').click();
            cy.contains('is required').should('not.be.empty');
        })
        it('logs in properly', () => {
            cy.get('#username').type("@CDawgVA2");
            cy.get('#password').type("@CDawgVA2");
            cy.get('.login-form button').click();
            cy.get(".lesson-wrap").should("be.visible");
        })
    })

    context('with registration form open', () => {
        beforeEach(() => {
            cy.contains('Start Learning').click();
            cy.get('#tab-Register').click();
        })

        it('errors on new user registration with empty fields', () => {
            cy.get('.register-form button')
                .scrollIntoView()
                .click();
            cy.contains('is required').should('not.be.empty');
        })
        it('successfully registers new user', () => {
            // intercept register requests
            cy.intercept('POST', '**/api/v1/users/', {}).as('register');
            // fill form
            cy.get('#username').type("@CDawgVA2");
            cy.get('#email').type("CDAWgVA2@gmail.com");
            cy.get('#password').type("@CDawgVA2");
            cy.get('#confirmPassword').type("@CDawgVA2");
            // submit form
            cy.get('.register-form button')
                .scrollIntoView()
                .click();
            // check request
            cy.wait('@register').should(({ request, response }) => {
                expect(request.body).to.include('username')
                expect(request.body).to.include('email')
                expect(request.body).to.include('password')
                expect(request.body).to.include('confirmPassword')
                expect(request.headers).to.have.property('content-type')
            })
            // check for success
            cy.contains('successful').should('be.visible');
        })
    })
})
