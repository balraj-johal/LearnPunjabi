/// <reference types="cypress" />

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

    before(() => {
        // login user
        cy.visit('http://localhost:3000');
        cy.contains('Start Learning').click();
        cy.get('#username').type("@CDawgVA2");
        cy.get('#password').type("@CDawgVA2");
        cy.get('.login-form button').click();
        cy.get(".lesson-wrap").should("be.visible");
        cy.wait(500);
        cy.visit('http://localhost:3000/lesson/lesson-mocked');
        // accept cookies
        cy.get('#rcc-confirm-button').click();
    })

    describe('allows user to complete lesson', () => {
        it('submits TextOnly task moving onto MultipleChoice task', () => {
            cy.wait(500);
            cy.get('#next-task-btn').click();
            cy.wait(100);
            cy.get('.multiple-choice').should("be.visible");
        })
        it('handles incorrect MultipleChoice answer', () => {
            cy.get('.multiple-choice-answer').last().click();
            cy.get('.chosen').should("be.visible");
            cy.get('#next-task-btn').click();
            cy.wait(100);
            cy.get('.chosen').should("not.exist");
        })
        it('handles correct answer moving onto SpecifiedOrder task', () => {
            cy.get('.multiple-choice-answer').first().click();
            cy.get('#next-task-btn').click();
            cy.wait(100);
            cy.get('.specified-order').should("be.visible");
        })
        it('handles incorrect SpecifiedOrder answer', () => {
            cy.get('.specified-order-answer').first().click();
            cy.get('.specified-order-answer').first().click();
            cy.get('#next-task-btn').click();
            cy.wait(100);
            cy.get('#answers .specified-order-answer').should('not.exist');
        })
        it('handles correct answer moving onto end', () => {
            cy.get('.specified-order-answer').last().click();
            cy.get('.specified-order-answer').last().click();
            cy.get('.specified-order-answer').last().click();
            cy.get('#next-task-btn').click();
            cy.wait(100);
            cy.get('.lesson-end').should("be.visible");
        })
        it('shows end screen with correct percentage', () => {
            cy.wait(100);
            cy.get('.lesson-end').should("contain.text", "60%");
        })
    }) 
})
