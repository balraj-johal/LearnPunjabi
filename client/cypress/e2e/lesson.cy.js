/// <reference types="cypress" />

import lesson from "../fixtures/lesson.json";

describe('lesson', () => {
    before(() => {
        // get mock lesson data
        cy.fixture('lesson').then((lesson) => {
            // setup get request intercept
            cy.intercept(
                'GET', 
                '**/api/v1/users/refreshToken', 
                { userID: "user._id" }
            ).as('getRefreshToken');
            cy.intercept(
                'GET', 
                '**/api/v1/lessons/*', 
                lesson
            ).as('getLesson');
        })
    })

    beforeEach(() => {
        // login user
        cy.visit('http://localhost:3000');
        cy.contains('Start Learning').click();
        cy.get('#username').type("@CDawgVA2");
        cy.get('#password').type("@CDawgVA2");
        cy.get('.login-form button').click();
        cy.get(".lesson-wrap").should("be.visible");
    })

    it('allows user to complete lesson', () => {
        cy.visit('http://localhost:3000/lesson/lesson-mocked');
        // accept cookies
        cy.get('#rcc-confirm-button').click();
        cy.wait(1000);
        cy.get('#next-task-btn').click();
    })
})
